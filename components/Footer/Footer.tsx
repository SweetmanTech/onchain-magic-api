import Zorb from "../Zorb"

interface FooterProps {
  className?: string
}

const Footer: React.FC<FooterProps> = ({ className }) => (
  <div
    className={`bg-transparent pt-[250px] md:pt-6 pb-6 w-full flex justify-center ${
      className || ""
    } footer`}
  >
    <div className="w-[90%] flex justify-center items-center xl:w-[1280px] font-hanson gap-5">
      made with
      <a href="https://github.com/ourzora" target="_blank" rel="noreferrer">
        <Zorb />
      </a>
      by{" "}
      <a
        href="https://github.com/SweetmanTech/zora-reward-leaderboard"
        target="_blank"
        rel="noreferrer"
      >
        sweetman.eth
      </a>
    </div>
  </div>
)

export default Footer
