import { useEffect, useState } from 'react';
import { getProducts } from "../../../api/api-server";
import { Card, Col, Row, Statistic, Table, Spin, Alert } from 'antd';
import { DollarOutlined, ShoppingCartOutlined, EyeOutlined, TagOutlined } from '@ant-design/icons';
import { PieChart, Pie, Tooltip, Legend, Cell } from 'recharts';


const calculateStatistics = (data) => {
  const totalValue = data.reduce((sum, product) => sum + (product.price * product.quantity), 0);
  const totalSold = data.reduce((sum, product) => sum + product.sold, 0);
  const totalViews = data.reduce((sum, product) => sum + product.views, 0);

  // Nhóm sản phẩm theo danh mục
  const categoryTotals = data.reduce((acc, product) => {
    const category = product.category.name;
    if (!acc[category]) {
      acc[category] = 0;
    }
    acc[category] += product.quantity;
    return acc;
  }, {});

  const categoryData = Object.keys(categoryTotals).map(category => ({
    name: category,
    value: categoryTotals[category]
  }));

  return {
    totalValue,
    totalSold,
    totalViews,
    productCount: data.length,
    topProducts: data.sort((a, b) => b.views - a.views).slice(0, 5),
    categoryData
  };
};

const OverviewDashboard = () => {
  const [statistics, setStatistics] = useState({
    totalValue: 0,
    totalSold: 0,
    totalViews: 0,
    productCount: 0,
    topProducts: [],
    categoryData: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductData = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data } = await getProducts();
        const stats = calculateStatistics(data);
        setStatistics(stats);
      } catch (error) {
        setError("Không thể lấy dữ liệu sản phẩm");
      } finally {
        setLoading(false);
      }
    };
    fetchProductData();
  }, []);

  const columns = [
    {
      title: 'Tên Sản Phẩm',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Số Lượng',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    // {
    //   title: 'Lượt Xem',
    //   dataIndex: 'views',
    //   key: 'views',
    // },
  ];

  if (loading) return <div className="text-center"><Spin size="large" /></div>;
  if (error) return <Alert message={error} type="error" showIcon />;

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-6">Thống Kê Tổng Quan</h1>
      <Row gutter={16}>
        <Col span={6}>
          <Card>
            <Statistic
              title="Tổng Giá Trị Hàng Tồn Kho"
              value={statistics.totalValue}
              prefix={<DollarOutlined />}
              precision={2}
              valueStyle={{ color: '#3f8600' }}
              suffix="₫"
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Tổng Số Sản Phẩm Đã Bán"
              value={statistics.totalSold}
              prefix={<ShoppingCartOutlined />}
              valueStyle={{ color: '#cf1322' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Tổng Lượt Xem"
              value={statistics.totalViews}
              prefix={<EyeOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Tổng Số Sản Phẩm"
              value={statistics.productCount}
              prefix={<TagOutlined />}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
      </Row>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Sản Phẩm Có Nhiều Số Lượng Sản Phẩm</h2>
        <Table
          columns={columns}
          dataSource={statistics.topProducts}
          rowKey="id"
          pagination={false}
        />
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Số Lượng Sản Phẩm Theo Danh Mục</h2>
        <PieChart width={800} height={400}>
          <Pie
            data={statistics.categoryData}
            dataKey="value"
            nameKey="name"
            outerRadius={150}
            fill="#8884d8"
            label
          >
            {statistics.categoryData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#82ca9d' : '#8884d8'} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </div>
    </div>
  );
};

export default OverviewDashboard;
