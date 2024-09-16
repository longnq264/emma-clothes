import { useEffect, useState } from 'react';
import { Table, Button, message, Card, Typography, Space } from 'antd';
import { fetchOrderDetails } from '../../../api/order';
import { useParams, useNavigate } from 'react-router-dom';
import { UserOutlined, DollarOutlined, CreditCardOutlined, EnvironmentOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const formatCurrency = (value) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

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
      title: 'SKU',
      dataIndex: ['product', 'variant', 'sku'],
      key: 'sku',
      render: (sku) => sku || 'Không có SKU',
    },
    {
      title: 'Giá',
      dataIndex: 'price',
      key: 'price',
      render: (text) => formatCurrency(text),
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    // {
    //   title: 'Tổng cộng',
    //   dataIndex: 'total_price',
    //   key: 'total_price',
    //   render: (text) => formatCurrency(text),
    // },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <Title level={2} className="text-center mb-6">Chi tiết đơn hàng</Title>
      {orderDetails && (
        <Card className="mb-6" bordered={false}>
          <Space direction="vertical" size="large" style={{ width: '100%' }}>
            <Space size="middle">
              <UserOutlined />
              <Text strong>Người đặt hàng:</Text>
              <Text>{orderDetails.user_name}</Text>
            </Space>
            {/* <Space size="middle">
              <PhoneOutlined />
              <Text strong>Số điện thoại:</Text>
              <Text>{orderDetails.user_phone}</Text>
            </Space> */}
            <Space size="middle">
              <DollarOutlined />
              <Text strong>Tổng số tiền:</Text>
              <Text>{formatCurrency(orderDetails.total_amount)}</Text>
            </Space>
            <Space size="middle">
              <CreditCardOutlined />
              <Text strong>Hình thức thanh toán:</Text>
              <Text>{orderDetails.payment}</Text>
            </Space>
            <Space size="middle">
              <EnvironmentOutlined />
              <Text strong>Địa chỉ giao hàng:</Text>
              <Text>{`${orderDetails.address_detail}, ${orderDetails.ward}, ${orderDetails.district}, ${orderDetails.city}`}</Text>
            </Space>
          </Space>
        </Card>
      )}
      <Card bordered={false}>
        <Table
          columns={itemColumns}
          dataSource={selectedOrderItems}
          rowKey="id"
          pagination={false}
          className="overflow-hidden"
        />
      </Card>
      <div className="flex justify-center mt-6">
        <Button
          onClick={() => navigate('/admin/orders')}
          type="primary"
        >
          Quay lại danh sách đơn hàng
        </Button>
      </div>
    </div>
  );
};

export default OrderDetails;
