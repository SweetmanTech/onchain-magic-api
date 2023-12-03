/* eslint-disable no-plusplus */
/* eslint-disable no-console */
import getDeterministicRandom from "./getDeterministicRandom"
import feminine from "../public/metadata/raw/feminine.json"
import masculineAndSpecial from "../public/metadata/raw/masculine_and_special.json"
import formatMetadata from "./formatMetadata"

const HALF_MAX = 4444

export const testGetMetadata = () => {
  const seen = new Set() // Use a Set for efficiency
  const duplicates = []

  for (let i = 1; i <= 8888; i++) {
    const metadataId = getDeterministicRandom(i)
    if (seen.has(metadataId)) {
      duplicates.push(metadataId)
    }
    seen.add(metadataId)
  }

  // Check and log duplicates
  if (duplicates.length) {
    console.error(`Found duplicates: ${duplicates.join(", ")}`)
  } else {
    console.log("No duplicates found!")
  }

  // Check for missing values
  for (let i = 1; i <= 8888; i++) {
    if (!seen.has(i)) {
      console.error(`Missing value in output: ${i}`)
    }
  }

  // Validate size of the set
  if (seen.size !== 8888) {
    console.error(`Expected 8888 unique values, but got ${seen.size} instead.`)
  }

  // Check missing formatMetadata response for feminine and masculineAndSpecial
  for (let i = 1; i <= HALF_MAX; i++) {
    if (!feminine.data[i - 1]) {
      console.error(`Missing feminine data for metadataId: ${i}`)
    }
  }

  for (let i = 1; i <= HALF_MAX; i++) {
    if (!masculineAndSpecial.data[i - 1]) {
      console.error(`Missing masculineAndSpecial data for metadataId: ${i + HALF_MAX}`)
    }
  }
}

const getMetadata = (tokenId, useIframe) => {
  const metadataId = getDeterministicRandom(tokenId)

  if (metadataId <= HALF_MAX) {
    return formatMetadata(feminine.data[metadataId - 1], tokenId, useIframe) // Adjust for zero-based indexing
  }
  const index = metadataId - HALF_MAX - 1 // Adjust for zero-based indexing

  return formatMetadata(masculineAndSpecial.data[index], tokenId, useIframe)
}

export default getMetadata
