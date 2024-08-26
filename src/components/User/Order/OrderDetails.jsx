import { useEffect, useState } from 'react';
import { Table, Button, message } from 'antd';
import { fetchOrderDetails } from '../../../api/order';
import { useParams, useNavigate } from 'react-router-dom';

const OrderDetails = () => {
  const [selectedOrderItems, setSelectedOrderItems] = useState([]);
  const [orderDetails, setOrderDetails] = useState(null);
  const { orderId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getOrderDetails = async () => {
      try {
        const orderDetails = await fetchOrderDetails(orderId);
        if (orderDetails && Array.isArray(orderDetails.items)) {
          setSelectedOrderItems(orderDetails.items);
          setOrderDetails(orderDetails);
        } else {
          setSelectedOrderItems([]);
          message.warning('Không có sản phẩm trong đơn hàng.');
        }
      } catch (error) {
        message.error('Không thể lấy chi tiết đơn hàng');
      }
    };

    getOrderDetails();
  }, [orderId]);

  const itemColumns = [
    {
      title: 'Tên sản phẩm',
      dataIndex: ['product', 'name'],
      key: 'name',
    },
    {
      title: 'Giá',
      dataIndex: 'price',
      key: 'price',
      render: (text) => `${text} VND`,
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Tổng cộng',
      dataIndex: 'total_price',
      key: 'total_price',
      render: (text) => `${text} VND`,
    },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-center">Chi tiết đơn hàng</h2>
      {orderDetails && (
        <div className="bg-white p-4 rounded shadow-md mb-6">
          <p className="text-lg font-semibold"><strong>Người đặt hàng:</strong> {orderDetails.user_name}</p>
          <p><strong>Tổng số tiền:</strong> {orderDetails.total_amount} VND</p>
          <p><strong>Hình thức thanh toán:</strong> {orderDetails.payment}</p>
          <p><strong>Trạng thái:</strong> {orderDetails.status}</p>
          <p><strong>Địa chỉ giao hàng:</strong> {`${orderDetails.address_detail}, ${orderDetails.ward}, ${orderDetails.district}, ${orderDetails.city}`}</p>
        </div>
      )}
      <div className="bg-white p-4 rounded shadow-md">
        <Table
          columns={itemColumns}
          dataSource={selectedOrderItems}
          rowKey="id"
          pagination={false}
          className="overflow-hidden"
        />
      </div>
      <div className="flex justify-center mt-6">
        <Button
          onClick={() => navigate('/admin/orders')}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Quay lại danh sách đơn hàng
        </Button>
      </div>
    </div>
  );
};

export default OrderDetails;
