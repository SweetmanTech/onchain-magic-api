import retryGetEns from "./retryGetEns"

export const getEnsNameByAddress = async (address: string) => {
  const ensRecord = await retryGetEns(address)
  if (!ensRecord?.title) return ""

  return ensRecord.title
}

export const getEnsImageURL = async (address: string) => {
  const ensName = await getEnsNameByAddress(address)
  const url = `https://metadata.ens.domains/mainnet/avatar/${ensName}`
  const response = await fetch(url)

  if (!response.ok) {
    return ""
  }

  return response.url
}
