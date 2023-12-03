import Head from "next/head"
import useZorbImage from "../../hooks/useZorbImage"

function SeoHead(props: any) {
  const { description, title } = props
  const { zorbImage } = useZorbImage("")

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="icon" href={zorbImage} />
      <meta name="og:title" content={title} />
      <meta property="og:image" content={zorbImage} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:site" content="@sweetman_eth" />
      <meta name="twitter:url" content="https://cre8ors.com/" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:image" content={zorbImage} />
      <link rel="icon" href={zorbImage} />
      <link rel="apple-touch-icon" href={zorbImage} />
    </Head>
  )
}

export default SeoHead
