import { useLeaderboardProvider } from "../../providers/LeaderboardProvider"
import LeaderboardTableBody from "./LeaderboardTableBody"
import SkeletonTableBody from "./SkeletonTableBody"

const LeaderboardTable = () => {
  const { collectors } = useLeaderboardProvider()

  return (
    <div className="md:px-4 w-full flex justify-center">
      <div
        className="w-[310px] xs:w-[370px] md:w-full 
            border-[2px] border-[black] border-solid
            h-[470px] rounded-lg 
            overflow-auto 
            shadow-[4px_4px_4px_rgb(0,0,0,0.25)] dark:shadow-[4px_4px_4px_rgb(255,255,255,0.25)]
            scrollbar scrollbar-thumb-[black] 
            scrollbar-track-white 
            scrollbar-thumb-rounded-full"
      >
        <table className="w-full font-hanson bg-white text-black">
          <thead className="border-b-[2px] border-black border-solid">
            <tr>
              <th
                className="p-[5px] md:p-4 
                    text-left border-r-[2px] 
                    border-black text-center
                    uppercase 
                    text-[8px] xs:text-[11px] md:text-[18px]
                    md:min-w-[100px]"
              >
                Rank
              </th>
              <th
                className="p-[5px] md:p-4 
                    text-left border-r-[2px] 
                    border-black text-center 
                    uppercase 
                    text-[8px] xs:text-[11px] md:text-[18px]
                    w-[100px] xs:!w-[130px] md:!w-[200px]"
              >
                Creator Rewards Earned
              </th>
              <th
                className="p-[5px] md:p-4 
                    text-left border-r-[2px] 
                    border-black text-center 
                    uppercase 
                    text-[8px] xs:text-[11px] md:text-[18px]"
              >
                Address
              </th>
            </tr>
          </thead>
          {collectors.length > 0 ? <LeaderboardTableBody /> : <SkeletonTableBody />}
        </table>
      </div>
    </div>
  )
}

export default LeaderboardTable
