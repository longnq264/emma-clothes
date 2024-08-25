import { useEffect, useState } from 'react';
import { Table, Select, Button, Popconfirm, message, Modal } from 'antd';
import { fetchOrders, updateOrderStatus, fetchOrderDetails } from '../.././../api/order'; // Điều chỉnh đường dẫn nếu cần

const { Option } = Select;

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedOrderItems, setSelectedOrderItems] = useState([]);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const ordersData = await fetchOrders();
        setOrders(ordersData);
      } catch (error) {
        console.error('Không thể lấy dữ liệu đơn hàng:', error);
      } finally {
        setLoading(false);
      }
    };

    getOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const response = await updateOrderStatus(orderId, newStatus);
      if (response.status) {
        message.success('Trạng thái đơn hàng đã được cập nhật');
        setOrders(prevOrders =>
          prevOrders.map(order =>
            order.id === orderId ? { ...order, status_id: newStatus } : order
          )
        );
      } else {
        message.error('Cập nhật trạng thái thất bại');
      }
    } catch (error) {
      message.error('Có lỗi xảy ra khi cập nhật trạng thái');
    }
  };

  const handlePrintOrder = (orderId) => {
    message.info(`In đơn hàng với mã: ${orderId}`);
  };

  const handleCancelOrder = async (orderId) => {
    try {
      const response = await updateOrderStatus(orderId, 5); // 5 là trạng thái "Đã hủy"
      if (response.status) {
        message.success('Đơn hàng đã được hủy');
        setOrders(prevOrders =>
          prevOrders.map(order =>
            order.id === orderId ? { ...order, status_id: 5 } : order
          )
        );
      } else {
        message.error('Hủy đơn hàng thất bại');
      }
    } catch (error) {
      message.error('Có lỗi xảy ra khi hủy đơn hàng');
    }
  };

  const handleViewItems = async (orderId) => {
    try {
      const orderDetails = await fetchOrderDetails(orderId);
  
      if (orderDetails && Array.isArray(orderDetails.items)) {
        setSelectedOrderItems(orderDetails.items);
      } else {
        setSelectedOrderItems([]); // Nếu không có items thì đặt mảng rỗng
        console.warn('Không có sản phẩm trong đơn hàng.');
      }
  
      setIsModalVisible(true);
    } catch (error) {
      message.error('Không thể lấy chi tiết đơn hàng');
    }
  };
  

  const handleModalCancel = () => {
    setIsModalVisible(false);
    setSelectedOrderItems([]);
  };

  const columns = [
    {
      title: 'Mã đơn hàng',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Mã người dùng',
      dataIndex: 'user_id',
      key: 'user_id',
    },
    {
      title: 'Tổng số tiền',
      dataIndex: 'total_amount',
      key: 'total_amount',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status_id',
      key: 'status_id',
      render: (text, record) => (
        <Select
          defaultValue={text}
          onChange={(newStatus) => handleStatusChange(record.id, newStatus)}
        >
          <Option value={1}>Chờ xử lý</Option>
          <Option value={2}>Đã xử lý</Option>
          <Option value={3}>Đã gửi hàng</Option>
          <Option value={4}>Đã giao hàng</Option>
          <Option value={5}>Đã hủy</Option>
        </Select>
      ),
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'created_at',
      key: 'created_at',
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (text, record) => (
        <div>
          <Button
            type="primary"
            onClick={() => handlePrintOrder(record.id)}
            style={{ marginRight: 8 }}
          >
            In đơn hàng
          </Button>
          <Button
            type="default"
            onClick={() => handleViewItems(record.id)}
            style={{ marginRight: 8 }}
          >
            Xem sản phẩm
          </Button>
          <Popconfirm
            title="Bạn có chắc muốn hủy đơn hàng này?"
            onConfirm={() => handleCancelOrder(record.id)}
            okText="Có"
            cancelText="Không"
          >
            <Button type="primary" danger>Hủy đơn hàng</Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  // Các cột để hiển thị chi tiết sản phẩm trong modal
  const itemColumns = [
    {
      title: 'Tên sản phẩm',
      dataIndex: ['product', 'name'], // Truy cập vào tên sản phẩm trong object product
      key: 'name',
    },
    {
      title: 'Giá',
      dataIndex: 'price', // Giá của từng mục trong đơn hàng
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
      dataIndex: 'total_price', // Tổng giá trị của từng mục
      key: 'total_price',
      render: (text) => `${text} VND`,
    },
  ];

  return (
    <div>
      <h2>Đơn hàng quản trị viên</h2>
      <Table
        columns={columns}
        dataSource={orders}
        rowKey="id"
        loading={loading}
      />

      <Modal
        title="Chi tiết sản phẩm"
        open={isModalVisible}
        onCancel={handleModalCancel}
        footer={[
          <Button key="close" onClick={handleModalCancel}>
            Đóng
          </Button>,
        ]}
      >
        <Table
          columns={itemColumns}
          dataSource={selectedOrderItems}
          rowKey="id"
          pagination={false}
        />
      </Modal>
    </div>
  );
};

export default AdminOrders;
