import { utils } from "ethers"
import { zora } from "@wagmi/core/chains"
import getCleanedEthereumAddress from "./getCleanedEthereumAddress"
import { ethGetLogsBatch } from "./alchemy/ethGetLogsBatch"
import ethBlockNumber from "./alchemy/eth_blockNumber"
import { zoraGetLogs } from "./zora/zora_getLogs"

const PROTOCOL_REWARDS_ADDRESS = "0x7777777F279eba3d3Ad8F4E708545291A6fDBA8B"

const padTopicAddress = (address) => `0x${address.slice(2).padStart(64, "0")}`

export const getRewardsDepositEventsByCreateReferral = async (chainId, createReferral) => {
  const eventSignature =
    "RewardsDeposit(address,address,address,address,address,address,uint256,uint256,uint256,uint256,uint256)"
  const topics = [utils.id(eventSignature), null, padTopicAddress(createReferral)]

  const latestBlock = await ethBlockNumber(chainId)
  const fromBlock = 0
  const blockRange = 10_000_000
  const requests = []

  for (let startBlock = fromBlock; startBlock <= latestBlock; startBlock += blockRange) {
    const endBlock = Math.min(startBlock + blockRange - 1, latestBlock)
    requests.push({
      fromBlock: `0x${startBlock.toString(16)}`,
      toBlock: `0x${endBlock.toString(16)}`,
      address: PROTOCOL_REWARDS_ADDRESS,
      topics,
    })
  }
  const batchedLogs =
    chainId === zora.id
      ? await zoraGetLogs(PROTOCOL_REWARDS_ADDRESS, topics, latestBlock, fromBlock)
      : await ethGetLogsBatch(chainId, requests)

  const parsedLogs = batchedLogs.map((log, index) => {
    try {
      const decodedData = utils.defaultAbiCoder.decode(
        [
          "address", // firstMinter
          "address", // zora
          "address", // from
          "uint256", // creatorReward
          "uint256", // createReferralReward
          "uint256", // mintReferralReward
          "uint256", // firstMinterReward
          "uint256", // zoraReward
        ],
        log?.data,
      )

      return {
        creator: getCleanedEthereumAddress(log.topics[1].toLowerCase()),
        createReferral: getCleanedEthereumAddress(log.topics[2].toLowerCase()),
        mintReferral: getCleanedEthereumAddress(log.topics[3].toLowerCase()),
        firstMinter: getCleanedEthereumAddress(decodedData[0]),
        zora: decodedData[1],
        from: decodedData[2],
        creatorReward: decodedData[3].toString(),
        createReferralReward: decodedData[4].toString(),
        mintReferralReward: decodedData[5].toString(),
        firstMinterReward: decodedData[6].toString(),
        zoraReward: decodedData[7].toString(),
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(`Error parsing log at index ${index}:`, log)
      throw error
    }
  })

  return parsedLogs.reverse()
}
