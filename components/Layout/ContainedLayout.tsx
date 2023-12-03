import React from "react"
import { ILayout } from "./types"
import SeoHead from "../SeoHead"
import Header from "../Header"
import Footer from "../Footer/Footer"

const ContainedLayout = ({ children }: ILayout) => {
  const seoText = "Currently Tracking: Zora Protocol Rewards"

  return (
    <div className="min-h-[100vh] w-screen text-white bg-[black] relative overflow-hidden">
      <div
        className={`absolute left-0 top-[0px] z-[1]
        w-full h-[calc(100%+500px)]
        `}
      />
      <SeoHead title="Zora Rewards Leaderboard" description={seoText} />
      <Header />
      <div className="flex justify-center relative z-[2]">
        <div className="md:w-[1280px] relative">{children}</div>
      </div>

      <div className="relative z-[1]">
        <Footer className="!pt-6" />
      </div>
    </div>
  )
}

export default ContainedLayout
