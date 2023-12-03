import { motion } from "framer-motion"
import Zorb from "../Zorb"

const Spinner = ({ size = 50 }) => (
  <motion.div
    animate={{ rotate: 360 }}
    transition={{
      duration: 2,
      repeat: Infinity,
      repeatType: "loop",
      ease: "linear",
    }}
  >
    <Zorb height={size} width={size} />
  </motion.div>
)

export default Spinner
