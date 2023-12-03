const getCleanedEthereumAddress = (address) => {
  const cleaned = BigInt(address).toString(16) // Convert padded address to hex without leading zeros
  return `0x${cleaned.padStart(40, "0")}` // Ensure the cleaned address is still 40 characters long
}

export default getCleanedEthereumAddress
