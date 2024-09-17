import { useEffect, useState } from "react"; 
import { getProducts } from "../../../api/api-server";
import { Card, Col, Row, Statistic, Table, Spin, Alert } from "antd";
import { DollarOutlined, TagOutlined, EyeOutlined } from "@ant-design/icons";
import {
  PieChart,
  Pie,
  Tooltip,
  Legend,
  Cell,
  // BarChart,
  // Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  LineChart,
  Line,
} from "recharts";
import "antd/dist/reset.css";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#A28FD0",
  "#FF6699",
  "#33CCFF",
  "#FF9933",
];

const calculateStatistics = (data) => {
  const totalValue = data.reduce(
    (sum, product) => sum + parseFloat(product.price) * product.quantity,
    0
  );
  const totalSold = data.reduce((sum, product) => sum + product.quantity, 0);
  const totalViews = data.reduce((sum, product) => sum + product.view, 0);

  const categoryTotals = data.reduce((acc, product) => {
    const category = product.category.name;
    if (!acc[category]) {
      acc[category] = { quantity: 0, totalValue: 0 };
    }
    acc[category].quantity += product.quantity;
    acc[category].totalValue += parseFloat(product.price) * product.quantity;
    return acc;
  }, {});

  const categoryData = Object.keys(categoryTotals).map((category) => ({
    name: category,
    quantity: categoryTotals[category].quantity,
    totalValue: categoryTotals[category].totalValue,
    averagePrice:
      categoryTotals[category].totalValue / categoryTotals[category].quantity,
  }));

  const monthlyData = data.reduce((acc, product) => {
    const month = new Date(product.created_at).toLocaleString("default", {
      month: "short",
      year: "numeric",
    });
    if (!acc[month]) {
      acc[month] = 0;
    }
    acc[month] += product.quantity;
    return acc;
  }, {});

  const monthlyDataArray = Object.keys(monthlyData)
    .sort((a, b) => new Date(a) - new Date(b))
    .map((month) => ({
      name: month,
      quantity: monthlyData[month],
    }));

  const totalProducts = data.length;
  const categoryPercentages = categoryData.map((category) => ({
    name: category.name,
    percentage: ((category.quantity / totalSold) * 100).toFixed(2),
  }));

  return {
    totalValue,
    totalSold,
    totalViews,
    productCount: totalProducts,
    topProducts: data.sort((a, b) => b.quantity - a.quantity).slice(0, 10),
    categoryData,
    monthlyDataArray,
    categoryPercentages,
  };
};

const OverviewDashboard = () => {
  const [statistics, setStatistics] = useState({
    totalValue: 0,
    totalSold: 0,
    totalViews: 0,
    productCount: 0,
    topProducts: [],
    categoryData: [],
    monthlyDataArray: [],
    categoryPercentages: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [adminInfo, setAdminInfo] = useState({ name: "", email: "" });

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

    const admin = JSON.parse(localStorage.getItem("admin")) || {};
    setAdminInfo({ name: admin.name || "", email: admin.email || "" });

    fetchProductData();
  }, []);

  const topProductsColumns = [
    {
      title: "Tên Sản Phẩm",
      dataIndex: "name",
      key: "name",
      render: (text) => <span className="font-medium">{text}</span>,
    },
    {
      title: "Số Lượng",
      dataIndex: "quantity",
      key: "quantity",
      sorter: (a, b) => a.quantity - b.quantity,
      render: (quantity) => <span>{quantity}</span>,
    },
    {
      title: "Doanh Thu",
      dataIndex: "price",
      key: "price",
      render: (price, record) =>
        `₫${(price * record.quantity).toLocaleString()}`,
      sorter: (a, b) => a.price * a.quantity - b.price * b.quantity,
    },
  ];

  const categoryColumns = [
    {
      title: "Danh Mục",
      dataIndex: "name",
      key: "name",
      render: (text) => <span className="font-medium">{text}</span>,
    },
    {
      title: "Số Lượng Sản Phẩm",
      dataIndex: "quantity",
      key: "quantity",
      sorter: (a, b) => a.quantity - b.quantity,
      render: (quantity) => <span>{quantity}</span>,
    },
    {
      title: "Doanh Thu",
      dataIndex: "totalValue",
      key: "totalValue",
      sorter: (a, b) => a.totalValue - b.totalValue,
      render: (value) => `₫${value.toLocaleString()}`,
    },
    {
      title: "Giá Trung Bình",
      dataIndex: "averagePrice",
      key: "averagePrice",
      sorter: (a, b) => a.averagePrice - b.averagePrice,
      render: (value) => `₫${value.toFixed(2).toLocaleString()}`,
    },
  ];

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  if (error)
    return (
      <div className="flex justify-center items-center h-screen">
        <Alert message={error} type="error" showIcon />
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 p-4 bg-gray-100 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold">Chào Mừng, {adminInfo.name}!</h2>
        <p className="text-gray-600">Email: {adminInfo.email}</p>
      </div>

      <h1 className="text-4xl font-bold mb-6">Thống Kê Tổng Quan</h1>

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={8}>
          <Card className="shadow-lg">
            <Statistic
              title="Tổng Tiền Giá Trị Toàn Bộ Hàng Hóa"
              value={statistics.totalValue}
              prefix={<DollarOutlined />}
              precision={2}
              valueStyle={{ color: "#3f8600" }}
              suffix="₫"
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card className="shadow-lg">
            <Statistic
              title="Tổng Số Sản Phẩm"
              value={statistics.productCount}
              prefix={<TagOutlined />}
              valueStyle={{ color: "#1890ff" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card className="shadow-lg">
            <Statistic
              title="Tổng Số Lượt Xem"
              value={statistics.totalViews}
              prefix={<EyeOutlined />}
              valueStyle={{ color: "#faad14" }}
            />
          </Card>
        </Col>
      </Row>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Số Lượng Sản Phẩm Theo Danh Mục</h2>
        <PieChart width={400} height={400}>
          <Pie
            data={statistics.categoryData}
            dataKey="quantity"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={150}
            fill="#8884d8"
            label
          >
            {statistics.categoryData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend verticalAlign="bottom" height={36} />
        </PieChart>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Sản Phẩm Bán Chạy Nhất</h2>
        <Table
          columns={topProductsColumns}
          dataSource={statistics.topProducts}
          rowKey="id"
          pagination={{ pageSize: 10 }}
          className="shadow-lg"
        />
      </div>


      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Giá Trung Bình Sản Phẩm Theo Danh Mục</h2>
        <LineChart
          width={600}
          height={400}
          data={statistics.categoryData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip formatter={(value) => `₫${value.toFixed(2).toLocaleString()}`} />
          <Legend />
          <Line
            type="monotone"
            dataKey="averagePrice"
            stroke="#82ca9d"
            name="Giá Trung Bình"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </div>

    </div>
  );
};

export default OverviewDashboard;

