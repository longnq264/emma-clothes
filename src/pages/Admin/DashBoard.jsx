import { useEffect, useState } from "react";
import { getProducts } from "../../../api/api-server";
import { Bar, Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  ArcElement,
} from "chart.js";

// Đăng ký các thành phần ChartJS
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  ArcElement
);

const OverviewDashboard = () => {
  const [products, setProducts] = useState([]);
  const [totalValue, setTotalValue] = useState(0);
  const [totalSold, setTotalSold] = useState(0);
  const [totalViews, setTotalViews] = useState(0);
  const [topProducts, setTopProducts] = useState([]);
  const [barChartData, setBarChartData] = useState({});
  const [lineChartData, setLineChartData] = useState({});
  const [pieChartData, setPieChartData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProductData();
  }, []);

  const fetchProductData = async () => {
    setLoading(true);
    setError(null);
    try {
      const productsResponse = await getProducts();
      const productsData = productsResponse.data || [];
      setProducts(productsData);

      // Tính tổng giá trị hàng tồn kho
      const totalValue = productsData.reduce(
        (acc, product) => acc + (product.price || 0) * (product.quantity || 0),
        0
      );
      setTotalValue(totalValue);

      // Tính tổng số lượng sản phẩm đã bán
      const totalSold = productsData.reduce(
        (acc, product) => acc + (product.sold || 0),
        0
      );
      setTotalSold(totalSold);

      // Tính tổng lượt xem sản phẩm
      const totalViews = productsData.reduce(
        (acc, product) => acc + (product.view || 0),
        0
      );
      setTotalViews(totalViews);

      // Tính thống kê các sản phẩm theo danh mục
      const categorySales = productsData.reduce((acc, product) => {
        const category = product.category?.name || "Unknown";
        if (!acc[category]) {
          acc[category] = 0;
        }
        acc[category] += product.sold || 0;
        return acc;
      }, {});

      // Thiết lập dữ liệu cho biểu đồ cột (Bar chart)
      const barChartData = {
        labels: Object.keys(categorySales),
        datasets: [
          {
            label: "Số Lượng Sản Phẩm Đã Bán Theo Danh Mục",
            data: Object.values(categorySales),
            backgroundColor: "rgba(54, 162, 235, 0.2)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 1,
          },
        ],
      };

      // Thiết lập dữ liệu cho biểu đồ đường (Line chart)
      const lineChartData = {
        labels: productsData.map((product) => product.name),
        datasets: [
          {
            label: "Lượt Xem Theo Sản Phẩm",
            data: productsData.map((product) => product.view || 0),
            fill: false,
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
            tension: 0.1,
          },
        ],
      };

      // Thiết lập dữ liệu cho biểu đồ tròn (Pie chart)
      const categoryCounts = productsData.reduce((acc, product) => {
        const category = product.category?.name || "Unknown";
        if (!acc[category]) {
          acc[category] = 0;
        }
        acc[category] += 1;
        return acc;
      }, {});

      const pieChartData = {
        labels: Object.keys(categoryCounts),
        datasets: [
          {
            label: "Tỷ Lệ Sản Phẩm Theo Danh Mục",
            data: Object.values(categoryCounts),
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
            ],
            borderWidth: 1,
          },
        ],
      };

      // Tìm sản phẩm có lượt xem nhiều nhất
      const sortedProducts = [...productsData].sort((a, b) => b.view - a.view);
      setTopProducts(sortedProducts.slice(0, 5)); // Top 5 sản phẩm có lượt xem cao nhất

      // Cập nhật dữ liệu cho biểu đồ
      setBarChartData(barChartData);
      setLineChartData(lineChartData);
      setPieChartData(pieChartData);
    } catch (error) {
      setError("Failed to fetch product data");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-6">Thống Kê Tổng Quan</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-blue-500 text-white rounded-lg p-4 shadow-md">
          <h2 className="text-xl font-semibold">Tổng Số Sản Phẩm</h2>
          <p className="text-3xl mt-2">{products.length}</p>
        </div>
        <div className="bg-green-500 text-white rounded-lg p-4 shadow-md">
          <h2 className="text-xl font-semibold">Tổng Giá Trị Hàng Tồn Kho</h2>
          <p className="text-3xl mt-2">{totalValue.toLocaleString()} ₫</p>
        </div>
        <div className="bg-red-500 text-white rounded-lg p-4 shadow-md">
          <h2 className="text-xl font-semibold">Tổng Số Sản Phẩm Đã Bán</h2>
          <p className="text-3xl mt-2">{totalSold}</p>
        </div>
        <div className="bg-yellow-500 text-white rounded-lg p-4 shadow-md">
          <h2 className="text-xl font-semibold">Tổng Lượt Xem</h2>
          <p className="text-3xl mt-2">{totalViews}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg p-4 shadow-md">
          <h2 className="text-xl font-semibold mb-4">
            Số Lượng Sản Phẩm Đã Bán Theo Danh Mục
          </h2>
          <Bar data={barChartData} />
        </div>
        <div className="bg-white rounded-lg p-4 shadow-md">
          <h2 className="text-xl font-semibold mb-4">
            Lượt Xem Sản Phẩm Theo Thời Gian
          </h2>
          <Line data={lineChartData} />
        </div>
        <div className="bg-white rounded-lg p-4 shadow-md">
          <h2 className="text-xl font-semibold mb-4">
            Tỷ Lệ Sản Phẩm Theo Danh Mục
          </h2>
          <Pie data={pieChartData} />
        </div>
      </div>

      <div className="bg-white rounded-lg p-4 shadow-md">
        <h2 className="text-xl font-semibold mb-4">
          Sản Phẩm Có Lượt Xem Nhiều Nhất
        </h2>
        <ul>
          {topProducts.map((product) => (
            <li key={product.id} className="py-2 border-b border-gray-200">
              <span className="font-semibold">{product.name}</span> -{" "}
              {product.view} lượt xem
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default OverviewDashboard;
