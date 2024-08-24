import { useEffect, useState } from 'react';
import UserOrders from '../../components/UI/Order/Orders';
import { getUserOrders } from '../../api/api-server'; // Đảm bảo rằng đường dẫn tới API là chính xác

const UserProfile = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token'); // Lấy token từ localStorage

        if (!token) {
          setError('Không có đơn nào , vui lòng đăng nhập lại.');
          setLoading(false);
          return;
        }

        const ordersData = await getUserOrders(token); // Sử dụng hàm getUserOrders để lấy dữ liệu đơn hàng

        // Kiểm tra nếu dữ liệu trả về hợp lệ
        if (ordersData && Array.isArray(ordersData.data)) {
          setOrders(ordersData.data); // Giả sử dữ liệu đơn hàng được lồng trong đối tượng `data`
        } else {
          setError('Dữ liệu đơn hàng không hợp lệ.');
        }
      } catch (err) {
        setError(err.message || 'Đã xảy ra lỗi khi tải dữ liệu đơn hàng.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <p className="text-center text-gray-700">Đang tải...</p>;
  if (error) return <p className="text-center text-red-600">Lỗi: {error}</p>;

  return (
    <div className="container mx-auto mt-6 px-4">
      {/* <h1 className="text-3xl font-bold mb-6">Hồ sơ đơn hàng</h1> */}
      {orders.length > 0 ? (
        <UserOrders orders={orders} />
      ) : (
        <p className="text-center text-gray-700">Bạn chưa có đơn hàng nào.</p>
      )}
    </div>
  );
};

export default UserProfile;
