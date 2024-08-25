import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const UserOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    console.log('Token being used:', token);

    const fetchOrders = async () => {
      if (!token) {
        setError('Token is missing.');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get('http://127.0.0.1:8000/api/list-order', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        console.log('Full response:', response);

        if (response.data && Array.isArray(response.data.data)) {
          setOrders(response.data.data);
        } else {
          console.error('Invalid data structure:', response.data);
          setError('Dữ liệu đơn hàng không hợp lệ.');
        }
      } catch (error) {
        console.error('Error fetching orders:', error);

        if (error.response && error.response.status === 401) {
          setError('Unauthorized access. Please check your token.');
        } else {
          setError(error.message || 'An unexpected error occurred.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [token]);

  const handleCancelOrder = async (orderId) => {
    try {
      const response = await axios.post(`http://127.0.0.1:8000/api/cancel-order/${orderId}`, {}, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.status === 200) {
        setOrders((prevOrders) => prevOrders.filter(order => order.id !== orderId));
        alert('Đơn hàng đã được hủy thành công.');
      } else {
        alert('Không thể hủy đơn hàng này.');
      }
    } catch (error) {
      console.error('Error canceling order:', error);
      alert('Đã xảy ra lỗi khi hủy đơn hàng.');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
          {/* <span className="visually-hidden">Loading...</span> */}
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-600 font-semibold mt-6">Đã xảy ra lỗi: {error}</div>;
  }

  if (!orders.length) {
    return <div className="text-center text-gray-700 mt-6">Bạn chưa có đơn hàng nào.</div>;
  }

  return (
    <div className="user-orders max-w-4xl mx-auto mt-8 px-4">
      <h2 className="text-3xl font-extrabold mb-8 text-gray-900">Đơn hàng của bạn</h2>
      <ul className="space-y-10">
        {orders.map((order) => (
          <li key={order.id} className="relative bg-white border border-gray-300 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            {/* Cancel button positioned in the top-right corner */}
            {order.status !== 'Cancelled' && (
              <button
                onClick={() => handleCancelOrder(order.id)}
                className="absolute top-4 right-4 bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-red-300"
              >
                Hủy đơn hàng
              </button>
            )}
            <div className="text-sm text-gray-500 mb-2">
              Ngày đặt: {new Date(order.created_at).toLocaleDateString()}
            </div>
            <div className="text-sm font-semibold mb-4">
              Trạng thái: <span className={`font-medium ${getStatusClass(order.status)}`}>{getStatusText(order.status)}</span>
            </div>
            <ul className="space-y-6 mb-6">
              {order.items?.map((item) => (
                <li key={item.id} className="flex items-center space-x-6">
                  <img
                    src={item.variant?.thumbnail || item.image || 'https://via.placeholder.com/200'}
                    alt={item.product_name || 'Sản phẩm'}
                    className="w-28 h-40 object-cover rounded-lg shadow-md border border-gray-200"
                  />
                  <div>
                    <div className="text-lg font-semibold text-gray-800">{item.product_name || 'Sản phẩm không có tên'}</div>
                    <div className="text-sm text-gray-500">SKU: {item.variant?.sku || 'Không có SKU'}</div>
                    <div className="text-sm text-gray-500">Giá: {item.price?.toLocaleString()}₫</div>
                    <div className="text-sm text-gray-500">Số lượng: {item.quantity}</div>
                    <div className="text-sm text-gray-500">Tổng: {item.total_price.toLocaleString()}₫</div>
                  </div>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

// Function to get status text
const getStatusText = (status) => {
  switch (status) {
    case 'Pending':
      return 'Chờ xử lý';
    case 'Confirmed':
      return 'Đã xác nhận';
    case 'Shipped':
      return 'Đang giao hàng';
    case 'Delivered':
      return 'Đã giao hàng';
    case 'Cancelled':
      return 'Đã hủy';
    default:
      return 'Không xác định';
  }
};

// Function to get status class
const getStatusClass = (status) => {
  switch (status) {
    case 'Pending':
      return 'text-yellow-600';
    case 'Confirmed':
      return 'text-blue-600';
    case 'Shipped':
      return 'text-orange-600';
    case 'Delivered':
      return 'text-green-600';
    case 'Cancelled':
      return 'text-red-600';
    default:
      return 'text-gray-600';
  }
};

export default UserOrders;
