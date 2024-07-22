// import { NavLink } from "react-router-dom";

const ShowMoreBtn = (props) => {
  console.log(props);
  // const { id, name } = props;
  return (
    <div className="flex justify-center my-4">
      {/* <NavLink to={`/category/${id}`} state={name}>
      </NavLink> */}
      <button className="border border-black px-32 py-2 rounded-full font-bold ">
        Show More
      </button>
    </div>
  );
};

export default ShowMoreBtn;
