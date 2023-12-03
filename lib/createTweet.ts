const createTweet = (tweetBody: string) => {
  const text = encodeURIComponent(tweetBody)
  window.open(`https://twitter.com/intent/tweet?text=${text}`, "_blank")
}

export default createTweet
