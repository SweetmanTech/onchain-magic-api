/* eslint-disable jsx-a11y/control-has-associated-label */

import Image from "next/image"
import Zorb from "../Zorb"

const ChainRow = ({ address, symbol, amount, icon }) => (
  <tr className="text-center bg-white text-black text-xs">
    <td /> {/* Empty cell for the rank */}
    <td className="flex gap-3 items-center">
      {symbol === "ZORA" ? (
        <Zorb width={20} height={20} address={address} />
      ) : (
        <Image src={icon} width={20} height={20} alt="chainicon" />
      )}
      {symbol}: {amount}ETH
    </td>
    <td /> {/* Empty cell for the address */}
  </tr>
)

export default ChainRow
