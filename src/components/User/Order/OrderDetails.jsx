import { useEffect, useState } from 'react';
import { Table, Button, message, Card, Typography, Space } from 'antd';
import { fetchOrderDetails } from '../../../api/order';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { UserOutlined, DollarOutlined, CreditCardOutlined, EnvironmentOutlined, PhoneOutlined } from '@ant-design/icons';
import { formatCurrency } from '../../../utils/helperFunction';

const { Title, Text } = Typography;

const printOrderDetails = () => {
  const printWindow = window.open("", "", "height=600,width=800");
  if (printWindow) {
    printWindow.document.write("<html><head><title>Print Order Details</title>");
    printWindow.document.write(
      `<style>
        body { font-family: Arial, sans-serif; }
        table { width: 100%; border-collapse: collapse; }
        th, td { border: 1px solid #ddd; padding: 8px; }
        th { background-color: #f4f4f4; }
        .space { margin-bottom: 8px; }
      </style>`
    );
    printWindow.document.write("</head><body>");
    printWindow.document.write(
      document.querySelector(".print-container").innerHTML
    );
    printWindow.document.write("</body></html>");
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  } else {
    message.error("Không thể mở cửa sổ in.");
  }
};

const OrderDetails = () => {
  const [orderDetails, setOrderDetails] = useState(null);
  const [selectedOrderItems, setSelectedOrderItems] = useState([]);
  const { orderId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const shouldPrint = queryParams.get("print") === "true";

  useEffect(() => {
    const getOrderDetails = async () => {
      try {
        const details = await fetchOrderDetails(orderId);
        if (details && Array.isArray(details.items)) {
          setSelectedOrderItems(details.items);
          setOrderDetails(details);
          if (shouldPrint) {
            printOrderDetails(); // Trigger print if print flag is true
          }
        } else {
          message.warning('Không có sản phẩm trong đơn hàng.');
        }
      } catch (error) {
        message.error('Không thể lấy chi tiết đơn hàng');
      }
    };

    getOrderDetails();
  }, [orderId, shouldPrint]);

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
      render: (price) => formatCurrency(price),
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
      key: 'quantity',
    },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="print-container">
        <Title level={2} className="text-center mb-6">Chi tiết đơn hàng</Title>
        {orderDetails && (
          <Card className="mb-6" bordered={false}>
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
              <Space size="middle">
                <UserOutlined />
                <Text strong>Người đặt hàng:</Text>
                <Text>{orderDetails.user_name}</Text>
              </Space>
              <Space size="middle">
                <PhoneOutlined />
                <Text strong>Số điện thoại:</Text>
                <Text>{orderDetails.phone_number}</Text>
              </Space>
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
      </div>

      <div className="flex justify-center mt-6">
        <Button
          onClick={() => navigate('/admin/orders')}
          type="primary"
        >
          Quay lại danh sách đơn hàng
        </Button>
        <Button
          onClick={printOrderDetails}
          type="default"
          className="ml-4"
        >
          In đơn hàng
        </Button>
      </div>
    </div>
  );
};

export default OrderDetails;
