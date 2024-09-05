import { NavLink } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="landing-page container mx-auto md:w-1/4">
      <div className="pt-20 pb-10 border-b-2 border-black text-center">
        <h1 className="text-center text-2xl md:text-5xl pb-12 uppercase">
          WelCome
        </h1>
        <p>Now youre a member of W Concept and our Loyalty Program.</p>
        <p>Check out the welcome gift weve just sent you via email.</p>
      </div>
      <div className="text-center mt-6">
        <h2 className="text-sm font-bold pb-10">You Can Also Get</h2>
        <NavLink
          to={"/products"}
          className="block uppercase font-bold py-2 bg-orange-500 w-2/3 container mx-auto rounded"
        >
          Start Shopping
        </NavLink>
      </div>
    </div>
  );
};

export default LandingPage;
