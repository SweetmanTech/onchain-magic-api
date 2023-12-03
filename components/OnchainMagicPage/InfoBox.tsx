const InfoBox = ({ label, value, onClick = null }) => (
  <button
    type="button"
    onClick={onClick}
    className="flex flex-col bg-white p-4 shadow-md rounded-lg mr-4 text-black"
  >
    <span className="font-hanson text-[18px] font-bold">{label}</span>
    <span className="font-hanson text-[33px]">{value}</span>
  </button>
)

export default InfoBox
