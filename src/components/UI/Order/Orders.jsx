import { useEffect, useState } from "react";
import { listOrder, cancelOrder } from "../../../api/order";
import { getTokenFromLocalStorage } from "../../../utils/indexUtils";

const UserOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedReason, setSelectedReason] = useState("");

  const token = getTokenFromLocalStorage();

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const fetchedOrders = await listOrder(token);
        
        // Sort orders by created_at date, newest first
        const sortedOrders = fetchedOrders.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );

        setOrders(sortedOrders);
      } catch (err) {
        setError("Lỗi khi lấy đơn hàng");
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, [token]);

  const handleCancelOrder = async () => {
    if (!selectedOrder || !selectedReason) {
      alert("Vui lòng chọn lý do để hủy đơn hàng.");
      return;
    }

    try {
      await cancelOrder(selectedOrder, token, selectedReason);
      setOrders((prevOrders) =>
        prevOrders.filter((order) => order.id !== selectedOrder)
      );
      alert(`Đơn hàng đã được hủy thành công. Lý do: ${selectedReason}`);
    } catch (error) {
      console.error("Error canceling order:", error);
      alert("Đã xảy ra lỗi khi hủy đơn hàng.");
    } finally {
      setSelectedOrder(null);
      setSelectedReason("");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div
          className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full"
          role="status"
        ></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 font-semibold mt-6">
        Đã xảy ra lỗi: {error}
      </div>
    );
  }

  if (!orders.length) {
    return (
      <div className="text-center text-gray-700 mt-6">
        Bạn chưa có đơn hàng nào.
      </div>
    );
  }

  return (
    <div className="user-orders max-w-4xl mx-auto mt-8 px-4">
      <h2 className="text-3xl font-extrabold mb-8 text-gray-900">
        Đơn hàng của bạn
      </h2>
      <ul className="space-y-10">
        {orders.map((order) => (
          <li
            key={order.id}
            className="relative bg-white border border-gray-300 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            {order.status !== "Cancelled" && (
              <div className="absolute top-4 right-4 flex flex-col space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Lý do hủy đơn hàng:
                </label>
                <select
                  className="mb-2 px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={selectedOrder === order.id ? selectedReason : ""}
                  onChange={(e) => {
                    setSelectedOrder(order.id);
                    setSelectedReason(e.target.value);
                  }}
                >
                  <option value="">Chọn lý do hủy đơn hàng</option>
                  <option value="Thay đổi ý định">Thay đổi ý định</option>
                  <option value="Tìm thấy giá tốt hơn">
                    Tìm thấy giá tốt hơn
                  </option>
                  <option value="Không cần sản phẩm nữa">
                    Không cần sản phẩm nữa
                  </option>
                  <option value="Sản phẩm không đúng mô tả">
                    Sản phẩm không đúng mô tả
                  </option>
                  <option value="Thời gian giao hàng quá lâu">
                    Thời gian giao hàng quá lâu
                  </option>
                </select>
                <button
                  onClick={handleCancelOrder}
                  className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-red-300"
                >
                  Hủy đơn hàng
                </button>
              </div>
            )}
            <div className="text-sm text-gray-500 mb-2">
              Ngày đặt: {new Date(order.created_at).toLocaleDateString()}
            </div>
            <div className="text-sm font-semibold mb-4">
              Trạng thái:{" "}
              <span className={`font-medium ${getStatusClass(order.status)}`}>
                {getStatusText(order.status)}
              </span>
            </div>
            <ul className="space-y-6 mb-6">
              {order.items?.map((item, index) => (
                <li key={index} className="flex items-center space-x-6">
                  <img
                    src={
                      item.variant?.thumbnail ||
                      item.image ||
                      "https://via.placeholder.com/200"
                    }
                    alt={item.product_name || "Sản phẩm"}
                    className="w-28 h-40 object-cover rounded-lg shadow-md border border-gray-200"
                  />
                  <div>
                    <div className="text-lg font-semibold text-gray-800">
                      {item.product_name || "Sản phẩm không có tên"}
                    </div>
                    <div className="text-sm text-gray-500">
                      SKU: {item.variant?.sku || "Không có SKU"}
                    </div>
                    <div className="text-sm text-gray-500">
                      Giá: {item.price?.toLocaleString()}₫
                    </div>
                    <div className="text-sm text-gray-500">
                      Số lượng: {item.quantity}
                    </div>
                    <div className="text-sm text-gray-500">
                      Tổng: {item.total_price.toLocaleString()}₫
                    </div>
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

// Hàm để lấy trạng thái đơn hàng
const getStatusText = (status) => {
  switch (status) {
    case "Pending":
      return "Chờ xử lý";
    case "Confirmed":
      return "Đã xác nhận";
    case "Shipped":
      return "Đang giao hàng";
    case "Delivered":
      return "Đã giao hàng";
    case "Cancelled":
      return "Đã hủy";
    default:
      return "Không xác định";
  }
};

// Hàm để lấy class CSS tương ứng với trạng thái đơn hàng
const getStatusClass = (status) => {
  switch (status) {
    case "Pending":
      return "text-yellow-600";
    case "Confirmed":
      return "text-blue-600";
    case "Shipped":
      return "text-orange-600";
    case "Delivered":
      return "text-green-600";
    case "Cancelled":
      return "text-red-600";
    default:
      return "text-gray-600";
  }
};

export default UserOrders;
