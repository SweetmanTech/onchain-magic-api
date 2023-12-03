const customLoader = ({ src, width, quality }) => `${src}?w=${width}&q=${quality || 75}`

export default customLoader
