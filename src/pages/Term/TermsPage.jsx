import react from 'react';
import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import 'tailwindcss/tailwind.css';

const TermsPage = () => {
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
                    home
                  </Link>
                ),
              },
              {
                title: (
                  <Link
                    to="/terms"
                    className="text-sm text-gray-500 hover:text-gray-800 transition duration-300"
                  >
                    Điều khoản và chính sách
                  </Link>
                ),
              },
            ]}
          />
        </div>
      </div>
      <div className="container mx-auto py-12 px-4 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-800 mb-6">Điều Khoản và Chính Sách</h1>
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">1. Chính sách chung về Giao - Nhận hàng tại Emma</h2>
              <p className="mb-2"><strong>a. Phí ship khi mua hàng online tại Emma</strong></p>
              <ul className="list-disc list-inside mb-4 text-gray-600">
                <li>Đơn hàng  lớn hơn 498k: Miễn phí vận chuyển.</li>
                <li>Đơn hàng nhỏ hơn 498k: Phí ship toàn quốc là 20.000đ</li>
              </ul>
              <p><strong>b. Thời gian nhận hàng</strong></p>
              <p className="text-gray-600 mb-4">
                Khách hàng khi đã được xác nhận đơn hàng đặt mua trên Website <a href="https://Emma.vn" className="text-blue-500">https://Emma.vn</a>, Facebook, Zalo... và các kênh thông tin chính thức khác của Emma sẽ nhận được sản phẩm trong vòng từ 3-5 ngày làm việc (tùy từng khu vực nhận hàng). Nhân viên chăm sóc tại Emma sẽ liên hệ với bạn trong thời gian sớm nhất có thể để hoàn tất thủ tục liên quan.
              </p>
              <p>
                Đối với các đơn hàng đồng phục hoặc sản phẩm in ấn khác, thời gian sản xuất và giao hàng có thể sẽ lâu hơn. Emma sẽ liên hệ và thông báo cụ thể về thời gian giao - nhận đến Quý khách.
              </p>
            </section>
            <section>
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">2. Quyền lợi về việc Thử và Nhận đồ khi mua sắm Online</h2>
              <p className="text-gray-600 mb-4">
                Để mang đến trải nghiệm mua sắm thuận lợi và thoải mái nhất cho khách hàng, Emma luôn xây dựng những chính sách thân thiện nhất. Theo đó, tất cả khách hàng đặt mua sản phẩm của Emma bằng phương thức mua hàng online đều được hưởng những quyền lợi như sau:
              </p>
              <ul className="list-disc list-inside text-gray-600 mb-4">
                <li>Khách hàng được xem và thử đồ trước khi thanh toán.</li>
                <li>Nếu thấy sản phẩm không vừa, không ưng ý, khách hàng hoàn toàn có thể trả lại ngay cho bưu tá và không cần thanh toán bất cứ chi phí phát sinh nào.</li>
              </ul>
            </section>
            <section>
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">3. Với khách hàng đã thanh toán và muốn đổi trả</h2>
              <p className="text-gray-600 mb-4">
                Khách hàng có nhu cầu khiếu nại, đổi trả sản phẩm do lỗi của Emma có thể liên hệ qua Hotline 1800 2086 để được hỗ trợ sớm nhất.
              </p>
              <p className="text-gray-600 mb-4">
                Tư vấn viên sẽ hướng dẫn khách hàng các bước cần thiết để tiến hành trả đổi trả.
              </p>
              <p className="text-gray-600">
                Lưu ý: Khách hàng được hỗ trợ đổi hàng với trường hợp thử đồ tại nhà mà không đúng với kích cỡ cơ thể. Khách hàng có thể tiến hành đổi trả online hoặc đổi trả trực tiếp tại hệ thống cửa hàng của Emma trên toàn quốc. Hàng hóa khi đổi trả cần được giữ nguyên tem mác và chưa qua sử dụng, giặt tẩy.
              </p>
              <p className="text-gray-600">
                Thông tin chi tiết và cụ thể về Chính sách đổi trả vui lòng tham khảo tại đây.
              </p>
            </section>
            <p className="text-gray-600">
              Hy vọng, những thông tin trên đây có thể giúp cho trải nghiệm mua sắm online của bạn tại Emma được an tâm và thuận tiện hơn!
            </p>
            <p className="text-gray-800 font-semibold">EMMA - LOOK GOOD. FEEL GOOD</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default TermsPage;
