import { useEffect } from "react"
import { useNetwork } from "wagmi"
import LoadingModal from "../LoadingModal"
import { useLeaderboardProvider } from "../../providers/LeaderboardProvider"

const TimeFilter = () => {
  const { numberOfDays, setNumberOfDays, loading } = useLeaderboardProvider()
  const { chain } = useNetwork()

  useEffect(() => {
    setNumberOfDays(1)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chain])

  return (
    <div className="flex justify-center mb-4">
      <button
        type="button"
        className={`mx-2 p-2 rounded rounded-lg ${numberOfDays === 1 ? "bg-gray-300" : ""}`}
        onClick={() => setNumberOfDays(1)}
      >
        1D
      </button>
      <button
        type="button"
        className={`mx-2 p-2 rounded-lg ${numberOfDays === 7 ? "bg-gray-300" : ""}`}
        onClick={() => setNumberOfDays(7)}
      >
        7D
      </button>
      <button
        type="button"
        className={`mx-2 p-2 rounded-lg ${numberOfDays === 30 ? "bg-gray-300" : ""}`}
        onClick={() => setNumberOfDays(30)}
      >
        30D
      </button>
      {loading && (
        <LoadingModal
          description={`getting onchain data for\n previous ${numberOfDays} day(s)...`}
        />
      )}
    </div>
  )
}

export default TimeFilter
