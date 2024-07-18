import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./SliderBanner.css"; // Custom CSS for additional styling

const Sale = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,
  };

  return (
    <>
      <div className="bg-gray-100">
        <div className="container mx-auto py-4">
          <Breadcrumb separator=">" className="text-gray-500">
            <Breadcrumb.Item>
              <Link to="/" className="text-sm text-gray-500 hover:text-gray-800 transition duration-300">
                Home
              </Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>Sale</Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </div>

      <section className="section-slide relative mt-0">
        <div className="w-full max-w-4xl mx-auto mt-4">
          <Slider {...settings}>
            {["helen.jpg", "helen.jpg", "helen.jpg"].map((img, index) => (
              <div key={index} className="relative h-56 md:h-64 lg:h-72">
                <img src={`../src/assets/img/${img}`} alt={`Slide ${index + 1}`} className="w-full h-full object-cover rounded-md shadow-lg" />
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                  <div className="text-center text-white">
                    <h2 className="text-2xl md:text-3xl font-bold mb-2">
                      {index === 0 ? "Women Collection 2024" : index === 1 ? "Men Collection 2024" : "Summer Collection"}
                    </h2>
                    <p className="text-sm md:text-lg mb-4">
                      {index === 0 ? "Discover the latest trends" : index === 1 ? "Check out our new arrivals" : "Get ready for the heat"}
                    </p>
                    <button className="px-5 py-2 bg-white text-black hover:bg-gray-200 transition duration-300">
                      Shop Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </section>

      <div className="container mx-auto py-10">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold mb-4 text-red-600">
            SALE - Xem Tất Cả
          </h1>
          <p className="text-gray-700 mb-6">
            Mua hàng giảm giá trực tuyến tại Emma và nhận được nhiều ưu đãi lớn!
            Khám phá các sản phẩm yêu thích nay với giá hấp dẫn hơn: đồ nữ, đồ
            nam.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Áo thun cổ chữ V Regular Fit",
                description: "Áo thun bằng cotton jersey nhẹ với cổ chữ V và vạt ngang. Dáng vừa để mặc thoải mái và tạo dáng cổ điển..",
                img: "helen.jpg",
              },
              {
                title: "Áo sơ mi Oxford Regular Fit",
                description: "Áo sơ mi dáng vừa vải cotton Oxford có cổ áo cài khuy, nẹp khuy kiểu truyền thống, cầu vai phía sau và một túi ngực mở. Tay dài với măng sét cài khuy và nẹp tay áo có khuy nối. Vạt hơi tròn.",
                img: "helen.jpg",
              },
              {
                title: "Váy midi linen pha",
                description: "Váy dài ngang bắp chân dệt thoi mỏng nhẹ làm từ linen pha viscose. Thân trên ôm với các đường may định hình ở phía trước, phần may xếp bản rộng ở phía sau, cổ vuông và dây vai mảnh, điều chỉnh được. Đường may nhún vải ở eo và chân váy xoè. Lót vải voan cotton.",
                img: "helen.jpg",
              },
              {
                title: "Áo thun cổ chữ V Regular Fit",
                description: "Áo thun bằng cotton jersey nhẹ với cổ chữ V và vạt ngang. Dáng vừa để mặc thoải mái và tạo dáng cổ điển..",
                img: "helen.jpg",
              },
              {
                title: "Áo sơ mi Oxford Regular Fit",
                description: "Áo sơ mi dáng vừa vải cotton Oxford có cổ áo cài khuy, nẹp khuy kiểu truyền thống, cầu vai phía sau và một túi ngực mở. Tay dài với măng sét cài khuy và nẹp tay áo có khuy nối. Vạt hơi tròn.",
                img: "helen.jpg",
              },
              {
                title: "Váy midi linen pha",
                description: "Váy dài ngang bắp chân dệt thoi mỏng nhẹ làm từ linen pha viscose. Thân trên ôm với các đường may định hình ở phía trước, phần may xếp bản rộng ở phía sau, cổ vuông và dây vai mảnh, điều chỉnh được. Đường may nhún vải ở eo và chân váy xoè. Lót vải voan cotton.",
                img: "helen.jpg",
              },
              {
                title: "Áo thun cổ chữ V Regular Fit",
                description: "Áo thun bằng cotton jersey nhẹ với cổ chữ V và vạt ngang. Dáng vừa để mặc thoải mái và tạo dáng cổ điển..",
                img: "helen.jpg",
              },
              {
                title: "Áo sơ mi Oxford Regular Fit",
                description: "Áo sơ mi dáng vừa vải cotton Oxford có cổ áo cài khuy, nẹp khuy kiểu truyền thống, cầu vai phía sau và một túi ngực mở. Tay dài với măng sét cài khuy và nẹp tay áo có khuy nối. Vạt hơi tròn.",
                img: "helen.jpg",
              },
              {
                title: "Váy midi linen pha",
                description: "Váy dài ngang bắp chân dệt thoi mỏng nhẹ làm từ linen pha viscose. Thân trên ôm với các đường may định hình ở phía trước, phần may xếp bản rộng ở phía sau, cổ vuông và dây vai mảnh, điều chỉnh được. Đường may nhún vải ở eo và chân váy xoè. Lót vải voan cotton.",
                img: "helen.jpg",
              },
            ].map((product, index) => (
              <div key={index} className="border p-4 rounded-lg hover:shadow-xl transition duration-300">
                <img src={`../src/assets/img/${product.img}`} alt={`Product ${index + 1}`} className="mb-4 w-full h-64 object-cover rounded-lg" />
                <h2 className="text-xl font-bold mb-2">{product.title}</h2>
                <p className="text-gray-700 mb-4">{product.description}</p>
                <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300">
                  Mua ngay
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container-fluid py-12 bg-gradient-to-r from-blue-500 to-purple-500">
        <h2 className="text-white text-center mt-5 pb-8 mx-auto text-2xl md:text-3xl lg:text-4xl font-semibold">
          Đừng bỏ lỡ thông tin cập nhật hàng tuần của Emma về sản phẩm và khuyến mãi
        </h2>
        <div className="flex flex-wrap justify-center">
          <div className="w-full lg:w-1/2 px-4 mt-5">
            <input
              type="email"
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition duration-300"
              placeholder="Nhập địa chỉ email của bạn"
              maxLength="40"
              minLength="5"
            />
          </div>
          <div className="w-full lg:w-1/2 px-4 mt-5">
            <button className="w-full p-3 bg-white text-blue-500 font-semibold rounded-lg shadow-md hover:bg-blue-500 hover:text-black transition duration-300">
              Đăng ký
            </button>
          </div>
        </div>
      </div>

    </>
  );
};

export default Sale;
