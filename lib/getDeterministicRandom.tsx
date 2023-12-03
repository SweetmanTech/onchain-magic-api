/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
const crypto = require("crypto")

const generateSequence = (length) => Array.from({ length }, (_, index) => index + 1)

const deterministicShuffle = (array, seed) => {
  for (let i = array.length - 1; i > 0; i--) {
    const hash = crypto
      .createHash("sha256")
      .update(seed + String(i))
      .digest("hex")
    const randomIndex = parseInt(hash, 16) % (i + 1) // Get a number between 0 and i inclusive
    ;[array[i], array[randomIndex]] = [array[randomIndex], array[i]]
  }
  return array
}

const shuffledList = deterministicShuffle(generateSequence(8888), "CRE8ORS")

const getDeterministicRandom = (tokenId) => {
  if (tokenId < 1 || tokenId > 8888) {
    throw new Error("TokenId must be between 1 and 8888 inclusive.")
  }

  return shuffledList[tokenId - 1] // Adjust for zero-based indexing
}

export default getDeterministicRandom
