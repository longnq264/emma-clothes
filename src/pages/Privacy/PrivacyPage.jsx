import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import 'tailwindcss/tailwind.css';

const PrivacyPage = () => {
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
                    to="/privacy"
                    className="text-sm text-gray-500 hover:text-gray-800 transition duration-300"
                  >
                    Chính sách bảo mật
                  </Link>
                ),
              },
            ]}
          />
        </div>
      </div>
      <div className="container mx-auto py-12 px-4 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-800 mb-6">Chính sách bảo mật</h1>
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">Căn cứ pháp lý</h2>
              <ul className="list-disc list-inside text-gray-600">
                <li>Hiến pháp nước Cộng hòa xã hội chủ nghĩa Việt Nam năm 2013 và các văn bản hướng dẫn thi hành;</li>
                <li>Bộ luật Dân sự năm 2015 và các văn bản hướng dẫn thi hành;</li>
                <li>Luật An ninh mạng năm 2018 và các văn bản hướng dẫn thi hành;</li>
                <li>Luật Giao dịch điện tử năm 2005 và các văn bản hướng dẫn thi hành;</li>
                <li>Nghị định 13/2023/NĐ-CP ngày 24/02/2023 của Chính phủ về bảo vệ dữ liệu cá nhân và các văn bản hướng dẫn thi hành;</li>
                <li>Các văn bản pháp luật khác có liên quan.</li>
              </ul>
            </section>
            <section>
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">Giới thiệu</h2>
              <p className="text-gray-600 mb-4">
                Công ty Cổ phần Thời trang Emma (mã số doanh nghiệp: 0801222211; địa chỉ trụ sở chính: đường 165, Quận Cầu Giấy, Thành Phố Hà Nội, Việt Nam) luôn đặt tinh thần thượng tôn pháp luật lên hàng đầu và đặc biệt coi trọng việc bảo vệ Dữ liệu cá nhân của các Chủ thể dữ liệu.
              </p>
              <p className="text-gray-600">
                Trong quá trình Khách hàng giao dịch, tham gia các chương trình khuyến mại, quảng cáo, marketing và các hình thức xúc tiến thương mại tại website, hoặc ứng dụng, hoặc tại cửa hàng của Công ty Cổ phần Thời trang Emma và các Công ty liên kết của Công ty Cổ phần Thời trang Emma, chúng tôi có thể thu thập và xử lý một số dữ liệu cá nhân của quý Khách hàng theo các điều khoản dưới đây:
              </p>
            </section>
            <section>
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">Định nghĩa và diễn giải</h2>
              <ul className="list-disc list-inside text-gray-600">
                <li><strong>“Chúng tôi”</strong> là Công ty Cổ phần Thời trang Emma và các Công ty liên kết của Công ty Cổ phần Thời trang Emma.</li>
                <li><strong>“Công ty liên kết”</strong> là bất kỳ tổ chức nào trực tiếp hoặc gián tiếp kiểm soát hoặc bị kiểm soát bởi, hoặc chịu sự kiểm soát chung (sau đây gọi chung là “Quyền kiểm soát”) bởi bên đó vào thời điểm cung cấp và tiếp nhận Dữ liệu cá nhân được nêu tại đây.</li>
                <li><strong>“Khách hàng”</strong> là các tổ chức, hoặc cá nhân tiếp cận, tìm hiểu, đăng ký, sử dụng hoặc có liên quan trong quy trình hoạt động, cung cấp Sản phẩm, và Dịch vụ của Chúng tôi.</li>
                <li><strong>“Bên thứ ba”</strong> là các tổ chức, hoặc cá nhân không phải Công ty Cổ phần Thời trang Emma và các Công ty liên kết của Công ty Cổ phần Thời trang Emma và Khách hàng.</li>
                <li><strong>“Sản phẩm”</strong> là các mặt hàng, hàng hóa, quà tặng… thuộc quyền sở hữu của Công ty Cổ phần Thời trang Emma và các Công ty liên kết của Công ty Cổ phần Thời trang Emma cung cấp cho Khách hàng.</li>
                <li><strong>“Dịch vụ”</strong> là các dịch vụ của Công ty Cổ phần Thời trang Emma và các Công ty liên kết của Công ty Cổ phần Thời trang Emma cung cấp cho Khách hàng.</li>
                <li><strong>“Dữ liệu cá nhân”</strong> là thông tin dưới dạng ký hiệu, chữ viết, chữ số, hình ảnh, âm thanh hoặc dạng tương tự trên môi trường điện tử gắn liền với một con người cụ thể hoặc giúp xác định một con người cụ thể.</li>
                <li><strong>“Xử lý dữ liệu cá nhân”</strong> là một chuỗi hoạt động bao gồm: thu thập, ghi, sao chép, sử dụng, lưu trữ, chỉnh sửa, chuyển giao, chia sẻ, tổng hợp, khóa, xóa, tiêu hủy hoặc các hình thức khác.</li>
                <li><strong>“Hệ thống”</strong> là website, ứng dụng hoặc các cửa hàng của Công ty Cổ phần Thời trang Emma và các Công ty liên kết của Công ty Cổ phần Thời trang Emma.</li>
              </ul>
            </section>
            
          </div>
        </div>
      </div>
    </>
  );
};

export default PrivacyPage;
