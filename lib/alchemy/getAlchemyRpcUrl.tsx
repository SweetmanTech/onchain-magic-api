import getAlchemyBaseUrl from "./getAlchemyBaseUrl"

const getAlchemyRpcUrl = (chainId) =>
  `${getAlchemyBaseUrl(chainId)}v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`

export default getAlchemyRpcUrl
