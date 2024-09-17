import { NavLink } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="landing-page container mx-auto md:w-1/4">
      <div className="pt-20 pb-10 border-b-2 border-black text-center">
        <h1 className="text-center text-2xl md:text-5xl pb-12 uppercase">
          Chào Mừng
        </h1>
        <p>Bây giờ bạn là thành viên của EMMA và Chương trình khách hàng thân thiết của chúng tôi.</p>
        <p>Hãy xem quà tặng chào mừng mà chúng tôi vừa gửi cho bạn qua email.</p>
      </div>
      <div className="text-center mt-6">
        <h2 className="text-sm font-bold pb-10">Bạn cũng có thể nhận được</h2>
        <NavLink
          to={"/products"}
          className="block uppercase font-bold py-2 bg-orange-500 w-2/3 container mx-auto rounded"
        >
        Bắt đầu mua sắm
        </NavLink>
      </div>
    </div>
  );
};

export default LandingPage;
