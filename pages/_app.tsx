import "../styles/globals.css"
import "@rainbow-me/rainbowkit/styles.css"
import "react-toastify/dist/ReactToastify.css"

import type { AppProps } from "next/app"
import { RainbowKitProvider, getDefaultWallets, connectorsForWallets } from "@rainbow-me/rainbowkit"
import { configureChains, createConfig, WagmiConfig } from "wagmi"
import {
  goerli,
  mainnet,
  base,
  zora,
  optimism,
  baseGoerli,
  zoraTestnet,
  optimismGoerli,
} from "@wagmi/core/chains"
import { ToastContainer } from "react-toastify"
import * as React from "react"
import { Analytics } from "@vercel/analytics/react"
import { alchemyProvider } from "wagmi/providers/alchemy"
import { publicProvider } from "wagmi/providers/public"
import EthPriceProvider from "../providers/EthPriceProvider"

const myChains = [mainnet, base, zora, optimism, goerli, baseGoerli, zoraTestnet, optimismGoerli]
const { chains, publicClient, webSocketPublicClient } = configureChains(myChains, [
  alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY }),
  publicProvider(),
])

const { wallets } = getDefaultWallets({
  appName: "ZORA REWARDS LEADERBOARD",
  projectId: "68c5ce6a0bf63be0182de421f19951b8",
  chains,
})

const connectors = connectorsForWallets(wallets)
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
})

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider modalSize="compact" chains={chains}>
        <EthPriceProvider>
          <Component {...pageProps} />
          <ToastContainer />
          <Analytics />
        </EthPriceProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  )
}
export default MyApp
