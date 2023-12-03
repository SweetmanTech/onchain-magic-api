/* eslint-disable jsx-a11y/control-has-associated-label */
import { Button } from "../../shared/Button"

const LoadMoreRow = ({ onClick }) => (
  <tr className="text-center bg-white text-black hover:bg-blue-300">
    <td />
    <td />
    <td>
      <Button id="load-more-btn" type="button" onClick={onClick}>
        Load More
      </Button>
    </td>
  </tr>
)

export default LoadMoreRow
