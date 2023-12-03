import * as _ from "lodash"

const transformTwitterHandle = (twitterHandle?: string): string => {
  if (twitterHandle) {
    return _.startsWith(twitterHandle, "@", 0) ? twitterHandle : `@${twitterHandle}`
  }
  return "anonymous"
}

export default transformTwitterHandle
