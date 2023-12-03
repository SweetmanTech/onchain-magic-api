const formatMetadata = (raw, tokenId, useIframe) => {
  const metadata = {
    ...raw,
    name: `Cre8ors #${tokenId}`,
    description: "A cult for creators.",
  }
  if (useIframe) {
    metadata.animation_url = `${process.env.NEXT_PUBLIC_IFRAME_URL}${tokenId}`
  }
  return metadata
}

export default formatMetadata
