import { useEffect, useState } from "react";
import { getProducts } from "../../../api/api-server";
import { Card, Col, Row, Statistic, Table, Spin, Alert } from "antd";
import { DollarOutlined, TagOutlined } from "@ant-design/icons";
import {
  PieChart,
  Pie,
  Tooltip,
  Legend,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  LineChart,
  Line,
} from "recharts";
import "antd/dist/reset.css"; // Ensure Ant Design styles are applied

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
      acc[category] = { quantity: 0, totalValue: 0, totalPrice: 0 };
    }
    acc[category].quantity += product.quantity;
    acc[category].totalValue += parseFloat(product.price) * product.quantity;
    acc[category].totalPrice = parseFloat(product.price);
    return acc;
  }, {});

  const categoryData = Object.keys(categoryTotals).map((category) => ({
    name: category,
    quantity: categoryTotals[category].quantity,
    totalValue: categoryTotals[category].totalValue,
    averagePrice:
      categoryTotals[category].totalPrice / categoryTotals[category].quantity,
  }));

  const monthlyData = data.reduce((acc, product) => {
    const month = new Date(product.created_at).toLocaleString("default", {
      month: "short",
    });
    if (!acc[month]) {
      acc[month] = 0;
    }
    acc[month] += product.quantity;
    return acc;
  }, {});

  const monthlyDataArray = Object.keys(monthlyData).map((month) => ({
    name: month,
    quantity: monthlyData[month],
  }));

  const totalProducts = data.length;
  const categoryPercentages = categoryData.map((category) => ({
    name: category.name,
    percentage: (category.quantity / totalProducts) * 100,
  }));

  return {
    totalValue,
    totalSold,
    totalViews,
    productCount: data.length,
    topProducts: data.sort((a, b) => b.quantity - a.quantity).slice(0, 5),
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

    // Load admin info ở localStorage

    const admin = JSON.parse(localStorage.getItem("admin")) || {};
    setAdminInfo({ name: admin.name || "", email: admin.email || "" });

    fetchProductData();
  }, []);

  const columns = [
    {
      title: "Tên Sản Phẩm",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Số Lượng",
      dataIndex: "quantity",
      key: "quantity",
    },
  ];

  const categoryColumns = [
    {
      title: "Danh Mục",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Số Lượng Sản Phẩm",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Doanh Thu",
      dataIndex: "totalValue",
      key: "totalValue",
      render: (value) => `₫${value.toLocaleString()}`, // Format currency
    },
  ];

  if (loading)
    return (
      <div className="text-center mt-8">
        <Spin size="large" />
      </div>
    );
  if (error)
    return (
      <div className="text-center mt-8">
        <Alert message={error} type="error" showIcon />
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Thống Kê Tổng Quan</h1>
      <div className="mb-6 p-4 bg-gray-100 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold">Chào Mừng, {adminInfo.name}!</h2>
        <p className="text-gray-600">Email: {adminInfo.email}</p>
      </div>
      <Row gutter={16}>
        <Col span={8}>
          <Card className="shadow-lg">
            <Statistic
              title="Tổng Giá Trị Hàng Tồn Kho"
              value={statistics.totalValue}
              prefix={<DollarOutlined />}
              precision={2}
              valueStyle={{ color: "#3f8600" }}
              suffix="₫"
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card className="shadow-lg">
            <Statistic
              title="Tổng Số Sản Phẩm"
              value={statistics.productCount}
              prefix={<TagOutlined />}
              valueStyle={{ color: "#faad14" }}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card className="shadow-lg">
            <Statistic
              title="Tổng Số Sản Phẩm Đã Bán"
              value={statistics.totalSold}
              prefix={<DollarOutlined />}
              valueStyle={{ color: "#cf1322" }}
            />
          </Card>
        </Col>
      </Row>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">
          Số Lượng Sản Phẩm Theo Danh Mục
        </h2>
        <PieChart width={800} height={400}>
          <Pie
            data={statistics.categoryData}
            dataKey="quantity"
            nameKey="name"
            outerRadius={150}
            fill="#8884d8"
            label
          >
            {statistics.categoryData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={index % 2 === 0 ? "#82ca9d" : "#8884d8"}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Sản Phẩm Có Nhiều Số Lượng</h2>
        <Table
          columns={columns}
          dataSource={statistics.topProducts}
          rowKey="id"
          pagination={false}
          className="shadow-lg"
        />
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Doanh Thu Theo Danh Mục</h2>
        <BarChart width={800} height={400} data={statistics.categoryData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="totalValue" fill="#8884d8" />
        </BarChart>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">
          Giá Trung Bình Sản Phẩm Theo Danh Mục
        </h2>
        <LineChart width={800} height={400} data={statistics.categoryData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="averagePrice" stroke="#8884d8" />
          {/* <Line type="monotone" dataKey="averagePrice" stroke="#8884d8" />
          <Line type="monotone" dataKey="averagePrice" stroke="#82ca9d" /> */}
        </LineChart>
      </div>

      {/* <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Số Lượng Sản Phẩm Theo Tháng</h2>
        <LineChart width={800} height={400} data={statistics.monthlyDataArray}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="quantity" stroke="#8884d8" />
        </LineChart>
      </div> */}

      {/* <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Tỉ Lệ Sản Phẩm Theo Danh Mục</h2>
        <PieChart width={800} height={400}>
          <Pie
            data={statistics.categoryPercentages}
            dataKey="percentage"
            nameKey="name"
            outerRadius={150}
            fill="#8884d8"
            label
          >
            {statistics.categoryPercentages.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#82ca9d' : '#8884d8'} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </div> */}
    </div>
  );
};

export default OverviewDashboard;
