import PropTypes from "prop-types";

const ProgressBar = ({ value, maxValue }) => {
  const progress = Math.min((value / maxValue) * 100, 100);

  return (
    <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
      <div
        className="bg-blue-500 h-2 rounded-full"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

ProgressBar.propTypes = {
  value: PropTypes.number.isRequired,
  maxValue: PropTypes.number.isRequired,
};

export default ProgressBar;
