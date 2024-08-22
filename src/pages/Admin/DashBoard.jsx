import React from 'react';
import { ChartPieIcon, UsersIcon, ShoppingCartIcon, CashIcon } from '@heroicons/react/24/outline';

const DashBoard = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Revenue Overview */}
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4">
          <div className="flex-shrink-0">
            <CashIcon className="h-8 w-8 text-green-500" />
          </div>
          <div>
            <h2 className="text-xl font-semibold">Total Revenue</h2>
            <p className="text-2xl font-bold">$12,345</p>
            <p className="text-sm text-gray-500">Monthly Revenue</p>
          </div>
        </div>
        
        {/* Total Orders */}
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4">
          <div className="flex-shrink-0">
            <ShoppingCartIcon className="h-8 w-8 text-blue-500" />
          </div>
          <div>
            <h2 className="text-xl font-semibold">Total Orders</h2>
            <p className="text-2xl font-bold">789</p>
            <p className="text-sm text-gray-500">Orders this Month</p>
          </div>
        </div>

        {/* Total Products */}
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4">
          <div className="flex-shrink-0">
            <ChartPieIcon className="h-8 w-8 text-yellow-500" />
          </div>
          <div>
            <h2 className="text-xl font-semibold">Total Products</h2>
            <p className="text-2xl font-bold">456</p>
            <p className="text-sm text-gray-500">Products in Stock</p>
          </div>
        </div>

        {/* Total Customers */}
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4">
          <div className="flex-shrink-0">
            <UsersIcon className="h-8 w-8 text-red-500" />
          </div>
          <div>
            <h2 className="text-xl font-semibold">Total Customers</h2>
            <p className="text-2xl font-bold">1,234</p>
            <p className="text-sm text-gray-500">Active Customers</p>
          </div>
        </div>
      </div>
      
      {/* Additional Statistics */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Additional Statistics</h2>
        <div className="bg-white p-6 rounded-lg shadow-md">
          {/* Here you can add charts or additional detailed stats */}
          <p className="text-gray-600">Here you can add charts or additional detailed stats.</p>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;

