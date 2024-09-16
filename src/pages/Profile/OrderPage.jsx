import { useEffect, useState } from 'react';
import UserOrders from '../../components/UI/Order/Orders';
import { getUserOrders } from '../../api/api-server'; // Ensure the API path is correct

const UserProfile = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token'); 


        if (!token) {
          setError('Vui lòng đăng nhập lại.');
          setLoading(false);
          return;
        }

        const ordersData = await getUserOrders(token); // Use getUserOrders to fetch order data

        // Check if the response data is valid
        if (ordersData && Array.isArray(ordersData.data)) {
          setOrders(ordersData.data); // Assuming order data is nested within a `data` object
        } else {
          // setError('Dữ liệu đơn hàng không hợp lệ.');
        }
      } catch (err) {
        // setError(err.message || 'Đã xảy ra lỗi khi tải dữ liệu đơn hàng.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <p className="text-center text-gray-700">Đang tải...</p>;
  if (error) return <p className="text-center text-red-600">Lỗi: {error}</p>;

  // Display message when there are no orders
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
