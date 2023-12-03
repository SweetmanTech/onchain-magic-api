import { toast } from "react-toastify"

const handleTwitterVerificationError = (error: any) => {
  const rateLimit = error?.rateLimit
  if (!rateLimit) {
    toast.error(error?.title)
    return
  }
  const twitterApiReset = rateLimit?.reset
  const now = new Date()
  const milliNow = now.getTime()
  const timeTillCooldown = twitterApiReset * 1000 - milliNow
  const secondsTillCooldown = timeTillCooldown / 1000
  const minutesTillCooldown = secondsTillCooldown / 60
  toast.error(
    `Twitter verification cooldown for another ${Math.round(
      minutesTillCooldown,
    )} minutes and ${Math.round(secondsTillCooldown % 60)} seconds`,
  )
}

export default handleTwitterVerificationError
