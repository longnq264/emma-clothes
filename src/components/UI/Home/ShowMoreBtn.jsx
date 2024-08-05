import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

const ShowMoreBtn = ({ props }) => {
  // const { id, name } = props;
  return (
    <div className="flex justify-center my-6">
      <NavLink to={props}>
        <button className="border border-black px-32 py-2 rounded-full font-bold ">
          Show More
        </button>
      </NavLink>
    </div>
  );
};

ShowMoreBtn.propTypes = {
  props: PropTypes.any,
};
export default ShowMoreBtn;
