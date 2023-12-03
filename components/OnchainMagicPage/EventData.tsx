import Image from "next/image"
import InfoBox from "./InfoBox"
import Earnings from "../Earnings"

const EventData = ({ name, data, icon = "" }) => {
  const totalRewards = data.reduce(
    (sum, event) =>
      sum +
      BigInt(event.creatorReward) +
      BigInt(event.createReferralReward) +
      BigInt(event.mintReferralReward) +
      BigInt(event.firstMinterReward) +
      BigInt(event.zoraReward),
    BigInt(0),
  )

  const allAddresses = data.flatMap((event) => [
    event.createReferral,
    event.creator,
    event.mintReferral,
    event.firstMinter,
    event.zora,
  ])

  const uniqueCreators = new Set(allAddresses)
  const creatorCount = uniqueCreators.size

  return (
    <div className="flex justify-around items-center">
      <InfoBox label={`Number of ${name} Events:`} value={data.length} />

      {icon ? (
        <div>
          <Image src={icon} width={25} height={25} alt="chainicon" />
        </div>
      ) : (
        <InfoBox label="Number of Creators Paid" value={creatorCount} />
      )}

      {data.length > 0 && (
        <Earnings label={`Amount paid to creators on ${name}:`} fees={totalRewards.toString()} />
      )}
    </div>
  )
}

export default EventData
