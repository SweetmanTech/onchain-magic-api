const SCALAR = 1000

const epochToReadableDate = (epochSeconds: number) => {
  const date = new Date(epochSeconds * SCALAR)

  const day = date.getDate()
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]
  const month = monthNames[date.getMonth()]
  const year = date.getFullYear()

  return `${day} ${month}, ${year}`
}

export default epochToReadableDate
