import { useRouter } from "next/router"
import { toast } from "react-toastify"
import axios from "axios"
import handleTwitterVerificationError from "../lib/handleTwitterVerificationError"
import verifyTweetUrl from "../lib/verifyTweetUrl"

const useTwitterVerification = () => {
  const router = useRouter()

  const handleVerified = () => {
    toast.success("verified")
    router.push("/status")
  }

  const handleVerification = (response: any) => {
    if (response?.sucess) {
      handleVerified()
      return
    }
    if (response?.err) {
      handleTwitterVerificationError(response?.err)
      return
    }

    toast.error("verification failed")
  }

  const alreadyVerified = async (handle: string) => {
    const response = await axios.get(
      `/api/allowlist/getAllowlistApplicantByTwitterHandle?twitterHandle=${handle}`,
    )
    const { data } = response
    return data?.isVerified
  }

  const verify = async (tweet: string) => {
    const handle = tweet.split("/")[3]
    const isVerified = await alreadyVerified(handle)
    if (isVerified) {
      handleVerified()
      return
    }

    const response = await verifyTweetUrl(tweet)
    handleVerification(response)
  }

  return {
    verify,
  }
}

export default useTwitterVerification
