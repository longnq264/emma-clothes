import react, { useEffect, useState } from "react";
import { getDashboardData } from "../../../api/api-server";
import ProductStatistics from "./ProductStatistics";
import OrderStatistics from "./OrderStatistics";
import { Spin, Alert } from "antd";

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getDashboardData();
        setDashboardData(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <Spin size="large" className="flex justify-center items-center h-screen" />;

  if (error) return <Alert message="Error" description={error} type="error" showIcon />;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Thống kê Dashboard</h1>

      <h2 className="text-xl font-semibold mt-4">Thống kê sản phẩm</h2>
      <ProductStatistics productData={dashboardData.product} />

      <h2 className="text-xl font-semibold mt-8">Thống kê đơn hàng</h2>
      <OrderStatistics orderData={dashboardData.order} />
    </div>
  );
};

export default Dashboard;
