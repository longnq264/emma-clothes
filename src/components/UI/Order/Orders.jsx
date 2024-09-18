import { useEffect, useState } from "react";
import { listOrder, cancelOrder } from "../../../api/order";
import { getTokenFromLocalStorage } from "../../../utils/indexUtils";
import { Modal, Button } from "antd";

const UserOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isCancelModalVisible, setIsCancelModalVisible] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [cancelReason, setCancelReason] = useState("");

  const token = getTokenFromLocalStorage();

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const fetchedOrders = await listOrder(token);
        // console.log(
        //   "Sorted Orders:",
        //   fetchedOrders.sort(
        //     (a, b) => new Date(b.created_at) - new Date(a.created_at)
        //   )
        // );

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

  const handleCancelOrder = (orderId) => {
    const order = orders.find((order) => order.id === orderId);

    if (order.status.toLowerCase() === "Pending") {
      alert("Chỉ có thể hủy đơn hàng với trạng thái Chờ xử lý (Pending).");
      return;
    }

    setSelectedOrderId(orderId);
    setIsCancelModalVisible(true);
  };

  const handleCancelSubmit = async () => {
    try {
      await cancelOrder(selectedOrderId, cancelReason);
      setOrders((prevOrders) =>
        prevOrders.filter((order) => order.id !== selectedOrderId)
      );
      alert("Đơn hàng đã được hủy thành công.");
    } catch (error) {
      console.error("Lỗi khi hủy đơn hàng:", error);
      alert(`Đã xảy ra lỗi vui lòng thử lại: ${error.message}`);
    } finally {
      setIsCancelModalVisible(false);
      setCancelReason("");
    }
  };

  const handleCancelModalClose = () => {
    setIsCancelModalVisible(false);
    setCancelReason("");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div
          className="spinner-border animate-spin inline-block w-8 h-8 border-4 border-t-4 border-t-blue-600 rounded-full"
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
      <ul className="space-y-8">
        {orders.map((order) => (
          <li
            key={order.id}
            className="relative bg-white border border-gray-200 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            {order.status === "Pending" && (
              <div className="absolute top-4 right-4 flex flex-col space-y-2">
                <button
                  onClick={() => handleCancelOrder(order.id)}
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
            <ul className="space-y-4">
              {order.items?.map((item, index) => (
                <li key={index} className="flex items-center space-x-4">
                  <img
                    src={
                      item.variant?.thumbnail ||
                      item.image ||
                      "https://via.placeholder.com/200"
                    }
                    alt={item.product_name || "Sản phẩm"}
                    className="w-24 h-32 object-cover rounded-md shadow-sm border border-gray-100"
                  />
                  <div>
                    <div className="text-lg font-semibold text-gray-800">
                      {item.product_name || "Sản phẩm không còn tồn tại"}
                    </div>
                    <div className="text-sm text-gray-500">
                      SKU: {item.variant?.sku || ""}
                    </div>
                    <div className="text-sm text-gray-500">
                      Giá: {formatCurrency(item.price)}
                    </div>
                    <div className="text-sm text-gray-500">
                      Số lượng: {item.quantity}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            {/* Tổng tiền đơn hàng */}
            <div className="mt-4 text-lg font-bold text-gray-800">
              Tổng cộng: {formatCurrency(order.total_amount)}
            </div>
          </li>
        ))}
      </ul>

      {/* Modal lý do hủy đơn hàng */}
      <Modal
        title="Hủy đơn hàng"
        visible={isCancelModalVisible}
        onCancel={handleCancelModalClose}
        footer={[
          <Button key="back" onClick={handleCancelModalClose}>
            Đóng
          </Button>,
          <Button key="submit" type="primary" onClick={handleCancelSubmit}>
            Xác nhận hủy
          </Button>,
        ]}
      >
        {/* <Form layout="vertical">
          <Form.Item label="Lý do hủy đơn hàng">
            <Input.TextArea
              rows={4}
              value={cancelReason}
              onChange={(e) => setCancelReason(e.target.value)}
              placeholder="Nhập lý do hủy"
            />
          </Form.Item>
        </Form> */}
      </Modal>
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

// Hàm để định dạng tiền tệ với cách hiển thị "đẹp hơn"
const formatCurrency = (amount) => {
  return Math.round(amount).toLocaleString("vi-VN") + " ₫";
};

export default UserOrders;

