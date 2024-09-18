import { useEffect, useState } from "react";
import { Col, Row, Statistic, Table, Spin, Alert } from "antd";
import {
  DollarOutlined,
  TagOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import { Bar, Pie, Doughnut } from "react-chartjs-2";
import { getProducts, getDashboardData } from "../../../api/api-server";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";
import PropTypes from "prop-types";
import "antd/dist/reset.css";

// Đăng ký các thành phần của Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
  Title
);

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
const cardStyles = {
  revenue:
    "bg-blue-500 text-white shadow-lg hover:shadow-xl transition-shadow duration-300",
  orders:
    "bg-green-500 text-white shadow-lg hover:shadow-xl transition-shadow duration-300",
  completed:
    "bg-yellow-500 text-white shadow-lg hover:shadow-xl transition-shadow duration-300",
  canceled:
    "bg-red-500 text-white shadow-lg hover:shadow-xl transition-shadow duration-300",
};

const ChartCard = ({ title, children, className }) => (
  <div className={`p-4 rounded-lg ${className}`}>
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    {children}
  </div>
);

const OverviewDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [adminInfo, setAdminInfo] = useState({ name: "", email: "" });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const productResponse = await getProducts();
        const dashboardResponse = await getDashboardData();
        setData({
          products: productResponse.data,
          dashboard: dashboardResponse.data,
        });
      } catch (err) {
        setError("Không thể lấy dữ liệu");
      } finally {
        setLoading(false);
      }
    };

    const admin = JSON.parse(localStorage.getItem("admin")) || {};
    setAdminInfo({ name: admin.name || "", email: admin.email || "" });

    fetchData();
  }, []);

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

  const { products, dashboard } = data;

  const calculateStatistics = (products) => {
    const totalValue = products.reduce(
      (sum, product) => sum + parseFloat(product.price) * product.quantity,
      0
    );
    const totalSold = products.reduce(
      (sum, product) => sum + product.quantity,
      0
    );
    const totalViews = products.reduce((sum, product) => sum + product.view, 0);

    const categoryTotals = products.reduce((acc, product) => {
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

    const monthlyData = products.reduce((acc, product) => {
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

    const totalProducts = products.length;
    const categoryPercentages = categoryData.map((category) => ({
      name: category.name,
      percentage:
        totalSold === 0
          ? 0
          : ((category.quantity / totalSold) * 100).toFixed(2),
    }));

    return {
      totalValue,
      totalSold,
      totalViews,
      productCount: totalProducts,
      topProducts: products
        .sort((a, b) => b.view - a.view) // Sắp xếp sản phẩm theo số lượt xem
        .slice(0, 6), // Chỉ lấy 10 sản phẩm hàng đầu
      categoryData,
      monthlyDataArray,
      categoryPercentages,
    };
  };

  const statistics = calculateStatistics(products);

  const barChartData = {
    labels: ["Tổng số đơn hàng", "Đơn hàng hoàn thành", "Đơn hàng đã hủy"],
    datasets: [
      {
        label: "Đơn hàng",
        data: [
          dashboard.order.countOrders,
          dashboard.order.completedOrders,
          dashboard.order.canceledOrders,
        ],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        borderColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        borderWidth: 1,
      },
    ],
  };

  const pieChartData = {
    labels: statistics.categoryPercentages.map((item) => item.name),
    datasets: [
      {
        data: statistics.categoryPercentages.map((item) => item.percentage),
        backgroundColor: COLORS,
        borderColor: "#fff",
        borderWidth: 1,
      },
    ],
  };

  const doughnutChartData = {
    labels: [
      "số người dùng",
      "Số quản trị viên",
      "Tổng người dùng đang hoạt động",
    ],
    datasets: [
      {
        data: [
          dashboard.user.countUser,
          dashboard.user.countAdmin,
          dashboard.user.userActive,
        ],
        backgroundColor: COLORS,
        borderColor: "#fff",
        borderWidth: 1,
      },
    ],
  };

  const topProductsColumns = [
    {
      title: "Tên Sản Phẩm",
      dataIndex: "name",
      key: "name",
      render: (text) => <span className="font-medium">{text}</span>,
    },
    // {
    //   title: "Số Lượng",
    //   dataIndex: "quantity",
    //   key: "quantity",
    //   render: (view) => <span>{view}</span>,
    // },
    {
      title: "Lượt xem",
      dataIndex: "view",
      key: "view",
      sorter: (a, b) => a.view - b.view, // Cột "Lượt xem" sắp xếp
      render: (view) => <span>{view}</span>,
    },
    {
      title: "Danh Mục",
      dataIndex: ["category", "name"], // Sửa phần này để trỏ đúng vào thuộc tính category.name
      key: "category.name",
      render: (name) => <span>{name}</span>,
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      render: (view) => <span>{view}</span>,
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
    // {
    //   title: "Doanh Thu",
    //   dataIndex: "totalValue",
    //   key: "totalValue",
    //   sorter: (a, b) => a.totalValue - b.totalValue,
    //   render: (value) => `₫${value.toLocaleString()}`,
    // },
    // {
    //   title: "Giá Trung Bình",
    //   dataIndex: "averagePrice",
    //   key: "averagePrice",
    //   sorter: (a, b) => a.averagePrice - b.averagePrice,
    //   render: (value) => `₫${value.toFixed(2).toLocaleString()}`,
    // },
  ];

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: (context) =>
            `${context.dataset.label}: ${context.raw.toLocaleString()}`,
        },
      },
    },
  };

  return (
    <div className="p-4 space-y-4">
      
      <div className="mb-6 p-4 bg-gray-100 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold">Chào Mừng, {adminInfo.name}!</h2>
        <p className="text-gray-600">Email: {adminInfo.email}</p>
        <br />
        <div></div>
      </div>
      <Row gutter={16}>
        <Col span={6}>
          <ChartCard title="Tổng Doanh Thu" className={cardStyles.revenue}>
            <Statistic
              title="Tổng Doanh Thu"
              value={`₫${dashboard.order.totalRevenue.toLocaleString()}`}
              prefix={<DollarOutlined />}
            />
          </ChartCard>
        </Col>
        <Col span={6}>
          <ChartCard title="Tổng Số Đơn Hàng" className={cardStyles.orders}>
            <Statistic
              title="Tổng Số Đơn Hàng"
              value={dashboard.order.countOrders}
              prefix={<TagOutlined />}
            />
          </ChartCard>
        </Col>
        <Col span={6}>
          <ChartCard
            title="Đơn Hàng Hoàn Thành"
            className={cardStyles.completed}
          >
            <Statistic
              title="Đơn Hàng Hoàn Thành"
              value={dashboard.order.completedOrders}
              prefix={<CheckCircleOutlined />}
            />
          </ChartCard>
        </Col>
        <Col span={6}>
          <ChartCard title="Đơn Hàng Đã Hủy" className={cardStyles.canceled}>
            <Statistic
              title="Đơn Hàng Đã Hủy"
              value={dashboard.order.canceledOrders}
              prefix={<CloseCircleOutlined />}
            />
          </ChartCard>
        </Col>
      </Row>
      <br />
      <h1>Sản phẩm</h1>
      <Row gutter={16}>
        <Col span={6}>
          <ChartCard
            title="Tổng số lượng sản phẩm"
            className={cardStyles.revenue}
          >
            <Statistic
              title="Tổng số lượng sản phẩm"
              value={`₫${dashboard.product.productStock.toLocaleString()}`}
              prefix={<DollarOutlined />}
            />
          </ChartCard>
        </Col>
        <Col span={6}>
          <ChartCard title="Số sản phẩm đã bán" className={cardStyles.orders}>
            <Statistic
              title="Số sản phẩm đã bán"
              value={dashboard.product.countSoldProducts}
              prefix={<TagOutlined />}
            />
          </ChartCard>
        </Col>
        <Col span={6}>
          <ChartCard title="Số Sản Phẩm" className={cardStyles.completed}>
            <Statistic
              title="Số Sản Phẩm"
              value={dashboard.product.products}
              prefix={<CheckCircleOutlined />}
            />
          </ChartCard>
        </Col>
      </Row>
      <br />
      <h1>Người dùng</h1>
      <Row gutter={16}>
        <Col span={6}>
          <ChartCard title="Số lượng người dùng" className={cardStyles.revenue}>
            <Statistic
              title="Số lượng người dùng tổng cộng trong hệ thống"
              value={dashboard.user.countUser}
              prefix={<TagOutlined />}
            />
          </ChartCard>
        </Col>
        <Col span={6}>
          <ChartCard title="Số nguời quản trị " className={cardStyles.orders}>
            <Statistic
              title="Số lượng người dùng có quyền quản trị (admin)."
              value={dashboard.user.countAdmin}
              prefix={<TagOutlined />}
            />
          </ChartCard>
        </Col>
        <Col span={6}>
          <ChartCard
            title="Tổng số người trong hệ thống"
            className={cardStyles.completed}
          >
            <Statistic
              title="bao gồm user và admin."
              value={dashboard.user.sumUser}
              prefix={<CheckCircleOutlined />}
            />
          </ChartCard>
        </Col>
        <Col span={6}>
          <ChartCard
            title="Số người dùng đang hoạt động "
            className={cardStyles.canceled}
          >
            <Statistic
              title="Số lượng người dùng đang hoạt động "
              value={dashboard.user.userActive}
              prefix={<CloseCircleOutlined />}
            />
          </ChartCard>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <ChartCard title="Biểu Đồ Thống Kê Đơn Hàng">
            <Bar data={barChartData} options={chartOptions} />
          </ChartCard>
        </Col>
        <Col span={12}>
          <ChartCard title="Biểu Đồ Phân Bố Danh Mục">
            <Pie data={pieChartData} options={chartOptions} />
          </ChartCard>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <ChartCard title="Biểu Đồ Thống Kê Người Dùng">
            <Doughnut data={doughnutChartData} options={chartOptions} />
          </ChartCard>
        </Col>
        <Col span={12}>
          <ChartCard title="Top Sản Phẩm View Nhiều Nhất">
            <Table
              dataSource={statistics.topProducts}
              columns={topProductsColumns}
              rowKey="id"
              pagination={false}
            />
          </ChartCard>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={24}>
          <ChartCard title="Thống Kê Sản Phẩm Theo Danh Mục">
            <Table
              dataSource={statistics.categoryData}
              columns={categoryColumns}
              rowKey="name"
              pagination={false}
            />
          </ChartCard>
        </Col>
      </Row>
    </div>
  );
};

ChartCard.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default OverviewDashboard;
