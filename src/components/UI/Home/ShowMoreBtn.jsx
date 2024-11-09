import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { memo } from "react";

const ShowMoreBtn = ({ props, color }) => {
  return (
    <div className="flex justify-center my-6 lg:my-12">
      <NavLink to={props} onClick={() => window.scrollTo(0, 0)}>
        <button
          className={`border ${color} bg-stone-100 px-8 md:px-32 py-2 md:py-3 rounded-full font-bold text-stone-700 hover:bg-stone-50 hover:text-stone-500 shadow-sm`}
        >
          Hiển thị thêm
        </button>
      </NavLink>
    </div>
  );
};

ShowMoreBtn.propTypes = {
  props: PropTypes.any,
  color: PropTypes.any,
};

export default memo(ShowMoreBtn);
