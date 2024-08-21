import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

const ShowMoreBtn = ({ props }) => {
  return (
    <div className="flex justify-center my-12">
      <NavLink to={props}>
        <button className="border bg-stone-100 px-32 py-2 rounded-full font-bold text-stone-700 hover:bg-stone-50 hover:text-stone-500">
          Hiển thị thêm
        </button>
      </NavLink>
    </div>
  );
};

ShowMoreBtn.propTypes = {
  props: PropTypes.any,
};

export default ShowMoreBtn;
