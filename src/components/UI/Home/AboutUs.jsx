import menImage from "../../../assets/img/men-clothing.jpg";
const AboutUs = () => {
  return (
    <div className="md:px-0 mt-14">
      <div className="container mx-auto">
        <div className="flex flex-col-reverse lg:flex-row">
          <div className="basis-1/2">
            <img className="w-full" src={menImage} alt="" />
          </div>
          <div className="basis-1/2 px-4 pb-10 pt-0 sm:px-10 lg:px-0 lg:pb-0 xl:pt-10 lg:pl-16">
            <h1 className="text-4xl lg:text-6xl font-bold text-stone-500 text-center md:text-start">
              Về Chúng Tôi
            </h1>
            <p className="pt-10 text-base md:text-xl md:pr-24 text-center md:text-start">
            Không ngừng sáng tạo và tỉ mỉ từ công đoạn sản xuất đến các khâu dịch vụ, nhằm mang đến cho Quý Khách Hàng những trải nghiệm mua sắm đặc biệt nhất: sản phẩm chất lượng - dịch vụ hoàn hảo - xu hướng thời trang mới mẻ và tinh tế. Thông qua các sản phẩm thời trang, EMMA luôn mong muốn truyền tải đến bạn những thông điệp tốt đẹp cùng với nguồn cảm hứng trẻ trung và tích cực.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
