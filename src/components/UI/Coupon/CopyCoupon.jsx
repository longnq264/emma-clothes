import PropTypes from "prop-types";
const CopyCoupon = ({ couponCopy }) => {
  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(couponCopy)
      .then(() => {
        alert("Đã sao chép mã: " + couponCopy);
      })
      .catch((err) => {
        console.error("Lỗi khi sao chép mã: ", err);
      });
  };

  return (
    <>
      <button
        onClick={copyToClipboard}
        className="text-xs bg-gray-300 font-bold px-2 py-1 rounded-lg"
      >
        Sao chép mã
      </button>
    </>
  );
};
CopyCoupon.propTypes = {
  couponCopy: PropTypes.any,
};
export default CopyCoupon;
