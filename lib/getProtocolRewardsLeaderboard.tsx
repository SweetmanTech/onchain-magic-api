import { base, mainnet, optimism, zora } from "@wagmi/core/chains"
import { getRewardsDepositEvents } from "./getRewardsDepositEvents"

const getProtocolRewardsLeaderboard = async (numberOfDays) => {
  const chains = [
    { id: mainnet.id, key: "ethereumReward" },
    { id: optimism.id, key: "optimismReward" },
    { id: base.id, key: "baseReward" },
    { id: zora.id, key: "zoraReward" },
  ]

  const fetchPromises = chains.map((chain) =>
    getRewardsDepositEvents(chain.id, numberOfDays).then((data) =>
      data.map((item) => ({ ...item, rewardType: chain.key })),
    ),
  )

  const allData = (await Promise.all(fetchPromises)).flat()

  const defaultRewards = chains.reduce(
    (acc, chain) => {
      acc[chain.key] = BigInt(0)
      return acc
    },
    { totalCreatorReward: BigInt(0) },
  )
  let totalZoraFees = BigInt(0)
  let totalCreatorFees = BigInt(0)

  const groupedData = allData.reduce((acc, curr) => {
    const recipients = [curr.creator, curr.createReferral, curr.firstMinter, curr.mintReferral]
    const fees = [
      curr.creatorReward,
      curr.createReferralReward,
      curr.firstMinterReward,
      curr.mintReferralReward,
    ]
    totalZoraFees += BigInt(curr.zoraReward)
    for (let i = 0; i < recipients.length; i += 1) {
      if (!acc[recipients[i]]) {
        acc[recipients[i]] = { ...defaultRewards }
      }
      acc[recipients[i]][curr.rewardType] += BigInt(fees[i])
      acc[recipients[i]].totalCreatorReward += BigInt(fees[i])
      totalCreatorFees += BigInt(fees[i])
    }

    return acc
  }, {})

  const leaderboardData = Object.entries(groupedData)
    .map(([creator, rewards]: any) => ({
      creator,
      ...chains.reduce(
        (acc, chain) => {
          acc[chain.key] = rewards[chain.key].toString()
          return acc
        },
        { totalCreatorReward: rewards.totalCreatorReward.toString() },
      ),
    }))
    .sort((a, b) => {
      if (BigInt(a.totalCreatorReward) < BigInt(b.totalCreatorReward)) {
        return 1
      }
      if (BigInt(a.totalCreatorReward) > BigInt(b.totalCreatorReward)) {
        return -1
      }
      return 0
    })

  return {
    leaderboardData,
    totalZoraFees: totalZoraFees.toString(),
    totalCreatorFees: totalCreatorFees.toString(),
  }
}

export default getProtocolRewardsLeaderboard
