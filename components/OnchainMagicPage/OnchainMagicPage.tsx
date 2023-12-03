import useZorbImage from "../../hooks/useZorbImage"
import { useOnchainMagicProvider } from "../../providers/OnchainMagicProvider"
import Layout from "../Layout"
import EventData from "./EventData"

const OnchainMagicPage = () => {
  const { optimismEvents, zoraEvents, baseEvents } = useOnchainMagicProvider()
  const { zorbImage } = useZorbImage(process.env.MINT_REFERRAL_FEE)

  return (
    <Layout type="contained">
      <div className="w-full pt-24 mx-auto">
        <div
          className="
          font-hanson
          text-center 
          text-[40px] md:text-[75px] 
          font-bold pt-6
        "
        >
          Onchain Magic
        </div>
        <div className="w-full flex justify-center pb-4">
          <div
            className="font-hanson 
            text-center 
            w-[300px] xs:w-[350px] md:w-[430px] 
            text-[13px] xs:text-[15px] md:text-[18px] 
            drop-shadow-[0_2px_2px_rgba(0,0,0,0.45)] 
            font-[500]"
          >
            Currently Tracking: <br /> amount paid to creators <br /> via OnchainMagic <br /> on OP
          </div>
        </div>
        <EventData name="Total" data={[...optimismEvents, ...zoraEvents, ...baseEvents]} />
        <EventData name="OP" icon="/Icons/OP.png" data={optimismEvents} />
        <EventData name="Zora" icon={zorbImage} data={zoraEvents} />
        <EventData name="Base" icon="/Icons/BASE.png" data={baseEvents} />
      </div>
    </Layout>
  )
}

export default OnchainMagicPage
