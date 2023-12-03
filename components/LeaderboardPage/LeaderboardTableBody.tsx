import useBalanceOf from "../../hooks/useBalanceOf"
import TokenGateRow from "../TokenGateRow"
import LeaderboardRow from "./LeaderboardRow"
import LoadMoreRow from "./LoadMoreRow"
import { useLeaderboardProvider } from "../../providers/LeaderboardProvider"

const LeaderboardTableBody = () => {
  const { pagination, collectors: rows, setPagination } = useLeaderboardProvider()
  const { balance, fetchBalance } = useBalanceOf()
  const showLoadMore = Boolean(balance && pagination < rows.length)
  return (
    <tbody>
      {rows.map((row, index) => {
        if ((balance > 0 && index < pagination) || index < 1)
          return <LeaderboardRow key={row.walletAddress} row={row} rank={index + 1} />
        return null
      })}
      {!balance && <TokenGateRow numberOfRows={rows.length} fetchBalance={fetchBalance} />}
      {showLoadMore && <LoadMoreRow onClick={() => setPagination(pagination + 100)} />}
    </tbody>
  )
}

export default LeaderboardTableBody
