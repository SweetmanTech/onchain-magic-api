const epochToModalTimerString = (epoch) => {
  // Multiply by 1000 to convert seconds to milliseconds

  const date = new Date(epoch * 1000)

  // Create a formatter using the desired options
  const options = {
    timeZone: "America/New_York", // EDT is Eastern Daylight Time
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  } as any

  const formatter = new Intl.DateTimeFormat("en-US", options)

  // Format the date
  return formatter?.format?.(date)
}

export default epochToModalTimerString
