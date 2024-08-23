import React from "react";
import {
  ChartPieIcon,
  UsersIcon,
  ShoppingCartIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/outline";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

// Ví dụ về dữ liệu biểu đồ
const data = [
  { name: "Jan", revenue: 4000 },
  { name: "Feb", revenue: 3000 },
  { name: "Mar", revenue: 5000 },
  { name: "Apr", revenue: 4500 },
  { name: "May", revenue: 6000 },
  { name: "Jun", revenue: 7000 },
];

const OverviewDashboard = () => {
  return (
    <div className="">
      <br />
      <h1 className="text-3xl font-bold mb-6">Tổng Quan Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Tổng Doanh Thu */}
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4">
          <div className="flex-shrink-0">
            <CurrencyDollarIcon className="h-8 w-8 text-green-500" />
          </div>
          <div>
            <h2 className="text-xl font-semibold">Tổng Doanh Thu</h2>
            <p className="text-2xl font-bold">$12,345</p>
            <p className="text-sm text-gray-500">Doanh thu tháng này</p>
          </div>
        </div>

        {/* Tổng Đơn Hàng */}
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4">
          <div className="flex-shrink-0">
            <ShoppingCartIcon className="h-8 w-8 text-blue-500" />
          </div>
          <div>
            <h2 className="text-xl font-semibold">Tổng Đơn Hàng</h2>
            <p className="text-2xl font-bold">789</p>
            <p className="text-sm text-gray-500">Đơn hàng trong tháng</p>
          </div>
        </div>

        {/* Tổng Sản Phẩm */}
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4">
          <div className="flex-shrink-0">
            <ChartPieIcon className="h-8 w-8 text-yellow-500" />
          </div>
          <div>
            <h2 className="text-xl font-semibold">Tổng Sản Phẩm</h2>
            <p className="text-2xl font-bold">456</p>
            <p className="text-sm text-gray-500">Sản phẩm trong kho</p>
          </div>
        </div>

        {/* Tổng Khách Hàng */}
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4">
          <div className="flex-shrink-0">
            <UsersIcon className="h-8 w-8 text-red-500" />
          </div>
          <div>
            <h2 className="text-xl font-semibold">Tổng Khách Hàng</h2>
            <p className="text-2xl font-bold">1,234</p>
            <p className="text-sm text-gray-500">Khách hàng hiện tại</p>
          </div>
        </div>
      </div>

      {/* Thống kê bổ sung với biểu đồ */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Thống Kê Bổ Sung</h2>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <LineChart width={600} height={300} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </div>
      </div>
    </div>
  );
};

export default OverviewDashboard;
