/* eslint-disable @next/next/no-html-link-for-pages */
import { useEffect } from "react"
import { useAccount } from "wagmi"
import { signIn, useSession, signOut } from "next-auth/react"
import axios from "axios"
import { toast } from "react-toastify"
import Link from "next/link"
import Image from "next/image"
import isAddressRegistered from "../../lib/isAddressRegistered"
import WalletConnectButton from "../WalletConnectButton"
import customLoader from "../../lib/customLoader"

function ConnectPage() {
  const { address } = useAccount()
  const { data: session }: any = useSession()

  useEffect(() => {
    const checkRegistered = async () => {
      const registered = await isAddressRegistered(address)
      if (registered) toast.success("You're registered!")
      return registered
    }

    const init = async () => {
      if (await checkRegistered()) return
      await axios.post(
        "/api/participants/addNewRecord",
        {
          walletAddress: address,
          twitterHandle: session.user.handle,
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_PARTICIPANTS_API_KEY}`,
          },
        },
      )
      await checkRegistered()
    }
    if (!session?.user || !address) return
    init()
  }, [session, address])

  return (
    <div className="bg-[url('/leaderboard_background.png')]">
      <div className="flex flex-col items-center justify-center h-screen gap-y-4 ">
        <Image
          src={session?.user ? "/twitter_logout.png" : "/twitter_log_in.png"}
          alt="Twitter Login"
          width={400}
          height={100}
          loader={customLoader}
          onClick={(e) => {
            e.preventDefault()
            if (session?.user) {
              signOut()
            } else {
              signIn("twitter")
            }
          }}
        />

        {!address && (
          <WalletConnectButton>
            <Image
              src="/connect_wallet.png"
              alt="WalletConnect"
              width={400}
              height={100}
              loader={customLoader}
            />
          </WalletConnectButton>
        )}
        {session?.user && (
          <Link href="/leaderboard">
            <Image
              src="/leaderboard.png"
              alt="WalletConnect"
              width={400}
              height={100}
              loader={customLoader}
            />
          </Link>
        )}
      </div>
    </div>
  )
}

export default ConnectPage
