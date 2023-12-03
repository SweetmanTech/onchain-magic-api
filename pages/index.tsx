import LeaderboardPage from "../components/LeaderboardPage"
import LeaderboardProvider from "../providers/LeaderboardProvider"

const Leaderboard = () => (
  <LeaderboardProvider>
    <LeaderboardPage />
  </LeaderboardProvider>
)

export default Leaderboard
