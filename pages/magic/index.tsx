import OnchainMagicPage from "../../components/OnchainMagicPage"
import OnchainMagicProvider from "../../providers/OnchainMagicProvider"

const MagicPage = () => (
  <OnchainMagicProvider>
    <OnchainMagicPage />
  </OnchainMagicProvider>
)

export default MagicPage
