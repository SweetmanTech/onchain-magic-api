import axios from "axios"

export const getUserInfo = async (address: string) => {
  const { data } = await axios.get(`/api/v2/get/userprofile?walletAddress=${address}`)
  return data
}

export const getSimilarProfiles = async (address: string) => {
  const { data } = await axios.get(
    `/api/v2/get/userprofile/similarProfiles?walletAddress=${address}`,
  )

  return data
}

export const saveUserInfo = async ({
  twitterhandle,
  location,
  needhelpwith,
  askmeabout,
  bio,
  username,
  address,
}) => {
  try {
    const { data } = await axios.post(`/api/v2/create/userprofile`, {
      walletAddress: address,
      location,
      bio,
      username,
      twitterHandle: twitterhandle,
      iNeedHelpWith: needhelpwith,
      askMeAbout: askmeabout,
    })
    return data
  } catch (err) {
    return null
  }
}

export const updateUserInfo = async ({
  twitterHandle,
  location,
  iNeedHelpWith,
  askMeAbout,
  bio,
  username,
  address,
}) => {
  try {
    const { data } = await axios.put(`/api/v2/update/userprofile`, {
      walletAddress: address,
      location,
      bio,
      username,
      twitterHandle,
      iNeedHelpWith,
      askMeAbout,
    })
    return data
  } catch (err) {
    return null
  }
}

export const updateUserCre8orNumber = async ({ walletAddress, cre8orNumber }) => {
  try {
    const { data } = await axios.post("/api/v2/update/userprofile/updateCre8orNumber", {
      walletAddress,
      cre8orNumber,
    })

    return data
  } catch (err) {
    return null
  }
}
