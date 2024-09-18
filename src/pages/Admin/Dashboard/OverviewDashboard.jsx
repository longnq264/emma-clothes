import { useEffect, useState } from "react";
import { Col, Row, Statistic, Table, Spin, Alert } from "antd";
import {
  DollarOutlined,
  TagOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  UserOutlined,
  UsergroupAddOutlined,
  ProductOutlined 
} from "@ant-design/icons";
import { Bar, Pie} from "react-chartjs-2";
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


const cardStyles = {
  revenue:
    "bg-blue-500 text-white shadow-lg hover:shadow-xl transition-shadow duration-300",
  orders:
    "bg-green-500 text-white shadow-lg hover:shadow-xl transition-shadow duration-300",
  completed:
    "bg-yellow-500 text-white shadow-lg hover:shadow-xl transition-shadow duration-300",
  canceled:
    "bg-red-500 text-white shadow-lg hover:shadow-xl transition-shadow duration-300",
  cam: "bg-orange-500 text-white shadow-lg hover:shadow-xl transition-shadow duration-300",
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
    // labels: ["Tổng số đơn hàng", "Đơn hàng hoàn thành", "Đơn hàng đã hủy"],
    labels: [
      "Đơn hàng đang chờ xử lý",
      "Đơn hàng đã xác nhận",
      "Đơn hàng đã giao",
      "Đơn hàng hoàn thành",
      "Đơn hàng đã hủy",
    ],
    datasets: [
      {
        label: "Đơn hàng",
        data: [
          dashboard.order.pendingOrders, //don hang dang cho xu ly
          dashboard.order.confirmedOrders, // don hang da xac nhan
          dashboard.order.shippedOrders, // don hang da giao
          dashboard.order.completedOrders, // don hang hoan thanh
          dashboard.order.canceledOrders, // don da huy
        ],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        borderColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        borderWidth: 1,
      },
    ],
  };

  
  //   labels: statistics.categoryPercentages.map((item) => item.name),
  //   datasets: [
  //     {
  //       data: statistics.categoryPercentages.map((item) => item.percentage),
  //       backgroundColor: COLORS,
  //       borderColor: "#fff",
  //       borderWidth: 1,
  //     },
  //   ],
  // };

  

  // const doughnutChartData = {
  //   labels: [
  //     "số người dùng",
  //     "Số quản trị viên",
  //     "Tổng người dùng đang hoạt động",
  //   ],
  //   datasets: [
  //     {
  //       data: [
  //         dashboard.user.countUser,
  //         dashboard.user.countAdmin,
  //         dashboard.user.userActive,
  //       ],
  //       backgroundColor: COLORS,
  //       borderColor: "#fff",
  //       borderWidth: 1,
  //     },
  //   ],
  // };

  // Thống kê danh mục


  // const danhmucChartData = {
  //   labels: [
  //     "",
  //     "",
  //     "",
  //   ],
  //   datasets: [
  //     {
  //       data: [
  //         dashboard.user.countUser,
  //         dashboard.user.countAdmin,
  //         dashboard.user.userActive,
  //       ],
  //       backgroundColor: COLORS,
  //       borderColor: "#fff",
  //       borderWidth: 1,
  //     },
  //   ],
  // };




  //

  const topProductsColumns = [
    {
      title: "Tên Sản Phẩm",
      dataIndex: "name",
      key: "name",
      render: (text) => <span className="font-medium">{text}</span>,
    },
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

 
  //   {
  //     title: "Danh Mục",
  //     dataIndex: "name",
  //     key: "name",
  //     render: (text) => <span className="font-medium">{text}</span>,
  //   },
  //   {
  //     title: "Số Lượng Sản Phẩm",
  //     dataIndex: "quantity",
  //     key: "quantity",
  //     sorter: (a, b) => a.quantity - b.quantity,
  //     render: (quantity) => <span>{quantity}</span>,
  //   },
  //   // {
  //   //   title: "Doanh Thu",
  //   //   dataIndex: "totalValue",
  //   //   key: "totalValue",
  //   //   sorter: (a, b) => a.totalValue - b.totalValue,
  //   //   render: (value) => `₫${value.toLocaleString()}`,
  //   // },
  //   // {
  //   //   title: "Giá Trung Bình",
  //   //   dataIndex: "averagePrice",
  //   //   key: "averagePrice",
  //   //   sorter: (a, b) => a.averagePrice - b.averagePrice,
  //   //   render: (value) => `₫${value.toFixed(2).toLocaleString()}`,
  //   // },
  // ];

  const categories = dashboard.category.categories;

  // Chuẩn bị dữ liệu cho biểu đồ hình tròn
  const pieDat = {
    labels: categories.map((category) => category.name),
    datasets: [
      {
        data: categories.map((category) => category.countProduct),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"], // Màu sắc cho từng phân khúc
        borderColor: "#fff",
        borderWidth: 1,
      },
    ],
  };

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
    layout: {
      padding: {
        top: 20,
        bottom: 10,
      },
    },
  };

  return (
    <div className="p-4 space-y-4">
      <div className="mb-6 p-6 bg-gradient-to-r from-blue-100 via-white to-blue-100 rounded-xl shadow-lg transition-transform transform hover:scale-100">
  <h2 className="text-3xl font-extrabold text-gray-900 mb-w transition-colors duration-50 hover:text-blue-400">
    Chào Mừng, {adminInfo.name}!
  </h2>
  <br />
  <p className="text-gray-700 text-lg">
    Email: <span className="font-medium text-">{adminInfo.email}</span>
  </p>
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
      <Row gutter={16}>
        <Col span={6}>
          <ChartCard
            title="Tổng số lượng sản phẩm"
            className={cardStyles.revenue}
          >
            <Statistic
              title="Tổng số lượng sản phẩm"
              value={dashboard.product.productStock}
              prefix={<ProductOutlined />}
            />
          </ChartCard>
        </Col>
        <Col span={6}>
          <ChartCard title="Số Sản Phẩm" className={cardStyles.orders}>
            <Statistic
              title="Số Sản Phẩm"
              value={dashboard.product.products}
              prefix={<ProductOutlined />}
            />
          </ChartCard>
        </Col>
        <Col span={6}>
          <ChartCard title="Số sản phẩm đã bán" className={cardStyles.completed}>
            <Statistic
              title="Số sản phẩm đã bán"
              value={dashboard.product.countSoldProducts}
              prefix={<CheckCircleOutlined />}
            />
          </ChartCard>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={6}>
          <ChartCard title="Số lượng người dùng" className={cardStyles.revenue}>
            <Statistic
              title="Số lượng người dùng tổng cộng trong hệ thống"
              value={dashboard.user.countUser}
              prefix={<UserOutlined />}
            />
          </ChartCard>
        </Col>
        <Col span={6}>
          <ChartCard title="Số nguời quản trị " className={cardStyles.orders}>
            <Statistic
              title="Số lượng người dùng có quyền quản trị (admin)."
              value={dashboard.user.countAdmin}
              prefix={<UserOutlined />}
            />
          </ChartCard>
        </Col>
        <Col span={6}>
          <ChartCard
            title="Tổng số người trong hệ thống"
            className={cardStyles.completed}
          >
            <Statistic
              title="Bao gồm user và admin."
              value={dashboard.user.sumUser}
              prefix={<UsergroupAddOutlined />}
            />
          </ChartCard>
        </Col>
        <Col span={6}>
          <ChartCard
            title="Số người dùng đang hoạt động "
            className={cardStyles.cam}
          >
            <Statistic
              title="Số lượng người dùng đang hoạt động "
              value={dashboard.user.userActive}
              prefix={<UserOutlined />}
            />
          </ChartCard>
        </Col>
      </Row>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
  <div className="bg-white shadow-2xl border border-gray-300 rounded-lg p-6 transition-transform transform hover:scale-105 hover:shadow-2xl">
    <h3 className="text-2xl font-semibold mb-4 text-gray-900">Biểu Đồ Thống Kê Đơn Hàng</h3>
    <Bar data={barChartData} options={chartOptions} />
  </div>
  <div className="bg-white shadow-2xl border border-gray-300 rounded-lg p-6 transition-transform transform hover:scale-105 hover:shadow-2xl">
    <h3 className="text-2xl font-semibold mb-4 text-gray-900">Top Sản Phẩm View Nhiều Nhất</h3>
    <Table dataSource={statistics.topProducts} columns={topProductsColumns} rowKey="id" pagination={false} />
  </div>
</div>
<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
  <div className="bg-white shadow-2xl border border-gray-300 rounded-lg p-6 transition-transform transform hover:scale-105 hover:shadow-2xl">
    <h3 className="text-2xl font-semibold mb-4 text-gray-900">Biểu Đồ Phân Bố Danh Mục</h3>
    <Pie data={pieDat} options={chartOptions} />
  </div>
</div>

    </div>
  );
};
ChartCard.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default OverviewDashboard;
