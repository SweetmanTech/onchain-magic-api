import React from "react"
import { ILayout } from "./types"
import SeoHead from "../SeoHead"
import Header from "../Header"

function BaseLayout({ children }: ILayout) {
  return (
    <div className="h-screen text-white bg-[black]">
      <SeoHead
        title="Cre8ors"
        description="Welcome to the next generation of creativity."
        image="/SEO_LOGO_ICON.png"
      />
      <Header />
      <div className="relative z-[2]">{children}</div>
    </div>
  )
}

export default BaseLayout
