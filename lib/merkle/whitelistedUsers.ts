import { getAddress, parseEther } from "ethers/lib/utils.js"

const whitelistedUsers = [
  {
    // sidneyswift.eth
    minter: getAddress("0xa061fbfa7dc7ee9f838a717e8b55fbc34641bf6e"),
    maxCount: 8,
    price: parseEther("0.15"),
  },
  {
    // katee
    minter: getAddress("0xEc11a95acA582F5ECF614695D2825b353Daf2454"),
    maxCount: 8,
    price: parseEther("0.15"),
  },
  {
    // sweetman.eth
    minter: getAddress("0xcfbf34d385ea2d5eb947063b67ea226dcda3dc38"),
    maxCount: 8,
    price: parseEther("0.15"),
  },
  {
    // sameer
    minter: getAddress("0x45a3143dC8e28A6d73ad6c6Fd78d80a4CAA17524"),
    maxCount: 8,
    price: parseEther("0.15"),
  },
  {
    // joe
    minter: getAddress("0x9B33A23d46d18300E9fCEfa1A88d6a73D216F58D"),
    maxCount: 8,
    price: parseEther("0.15"),
  },
  {
    // sameer #2
    minter: getAddress("0x282a134a17a330E0a238be2201506D5D786190F7"),
    maxCount: 8,
    price: parseEther("0.15"),
  },
  {
    // sid #2
    minter: getAddress("0x402E5373F770fb7D7E68Df7D02d5aB7fC43B4116"),
    maxCount: 8,
    price: parseEther("0.15"),
  },
  {
    // sweets #2
    minter: getAddress("0x22e82D83A37CfD6aF2aCa7Db666799Bf14613D85"),
    maxCount: 8,
    price: parseEther("0.15"),
  },
]

export default whitelistedUsers
