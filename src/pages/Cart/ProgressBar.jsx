import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { setFreeShip } from "../../store/cartSlice";
import { useEffect } from "react";

const ProgressBar = ({ value, maxValue }) => {
  const progress = Math.min((value / maxValue) * 100, 100);
  console.log(progress);
  const dispatch = useDispatch();
  useEffect(() => {
    if (progress >= 100) {
      dispatch(setFreeShip(progress));
    }
    if (progress <= 100) {
      dispatch(setFreeShip(progress));
    }
  }, [progress, dispatch]);

  return (
    <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
      <div
        className="bg-orange-400 h-2 rounded-full"
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
