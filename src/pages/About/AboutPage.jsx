import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";
import "tailwindcss/tailwind.css";

const AboutPage = () => {
  return (
    <>
      <div className="bg-white shadow-sm">
        <div className="container mx-auto py-4">
          <Breadcrumb
            separator=">"
            className="text-gray-500"
            items={[
              {
                title: (
                  <Link
                    to="/"
                    className="text-sm text-gray-500 hover:text-gray-800 transition duration-300"
                  >
                    Home
                  </Link>
                ),
              },
              {
                title: (
                  <Link
                    to="/about"
                    className="text-sm text-gray-500 hover:text-gray-800 transition duration-300"
                  >
                    About
                  </Link>
                ),
              },
            ]}
          />
        </div>
      </div>
      <div className="container mx-auto py-12 px-4 lg:px-8">
        <div className="max-w-8xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-800 mb-6">About Us</h1>
          <div className="relative bg-cover bg-center h-full mb-12">
            <img
              alt="Helen"
              src="../src/assets/img/helen.jpg"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-12">
              <div className="absolute top-8 left-8">
                <h1 className="text-4xl font-bold">EMMA</h1>
              </div>
              <div className="mt-auto mb-8 text-center">
                <h2 className="text-4xl font-bold">Emma_Vietnam</h2>
                <p className="mt-4 text-red-600">Since 2024</p>
              </div>
            </div>
          </div>
          <div className="my-12">
            <div className="flex items-center mb-6">
              <h4 className="text-2xl font-bold text-black">WHAT IS EMMA ?</h4>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-black mb-4">
                Chúng tôi là EMMA
              </h2>
              <p className="mb-5 text-gray-700 leading-relaxed">
                Được thành lập năm 2024, EMMA là thương hiệu Việt Nam về phong
                cách sống, cung cấp đa dạng các loại sản phẩm chất lượng và hữu
                dụng từ quần áo.
              </p>
              <p className="mb-5 text-gray-700 leading-relaxed">
                EMMA được thành lập vào năm 2024, bắt đầu bằng việc tối ưu hóa
                quy trình sản xuất nhằm tạo ra các sản phẩm đơn giản, chi phí
                hợp lý nhưng chất lượng tốt. Cụ thể, EMMA đã kiểm soát chất
                lượng các sản phẩm thông qua ba yếu tố: tuyển chọn nguyên vật
                liệu, tối ưu hóa quy trình sản xuất và đơn giản hóa.
              </p>
              <p className="mb-5 text-gray-700 leading-relaxed">
                Với tinh thần hợp tác và sự đoàn kết, chúng tôi hy vọng tạo ra
                một thế giới Emma, phồn thịnh và nhân văn hơn. Hãy cùng nhau
                khám phá và xây dựng tương lai tươi sáng qua Emma!
              </p>
            </div>
          </div>
        </div>
        <div className="mt-8">
              <Link
                to="/"
                className="text-blue-600 hover:text-blue-800 transition duration-300 text-lg"
              >
                &larr; Quay lại Trang Chủ
              </Link>
            </div>
      </div>
    </>
  );
};

export default AboutPage;