import Modal from "../../shared/Modal"
import Spinner from "../Spinner"

const MintingModal = () => (
  <Modal
    id="unlock_modal"
    isVisible
    onClose={() => null}
    containerClassName="rounded-[30px] md:rounded-[56px] overflow-hidden bg-black
        drop-shadow-[2px_3px_2px_rgba(255,255,255,0.25)]"
    modalClassName="!z-[110]"
  >
    <div
      className="px-4 py-8 samsungS8:p-6 xs:p-8 xl:p-6 rounded-lg
            flex-col flex justify-between items-center
            md:w-[692px] md:h-[528px]
            bg-black"
    >
      <div
        className="font-eigerdals 
          text-[30px] md:text-[65px] text-white uppercase"
      >
        Minting...
      </div>

      <Spinner size={100} />
      <pre
        className="font-quicksand 
              text-[18px] md:text-[33px]
              font-bold text-white
              text-center leading-[99.3%]
              w-[260px] md:w-full"
      >
        approve transaction in wallet.
      </pre>
    </div>
  </Modal>
)

export default MintingModal
