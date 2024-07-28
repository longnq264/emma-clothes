// import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import { getCustomers, deleteCustomer } from "../../api/api-server";

const StaffList = () => {
  // const [customers, setCustomers] = useState([]);

  // useEffect(() => {
  //   fetchCustomers();
  // }, []);

  // const fetchCustomers = async () => {
  //   try {
  //     const response = await getCustomers();
  //     setCustomers(response.data || []);
  //   } catch (error) {
  //     console.error("Failed to fetch customers:", error);
  //   }
  // };

  // const handleDelete = async (customerId) => {
  //   try {
  //     await deleteCustomer(customerId);
  //     fetchCustomers(); // Cập nhật danh sách khách hàng sau khi xóa
  //   } catch (error) {
  //     console.error("Failed to delete customer:", error);
  //   }
  // };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-6">Danh Sách nhân viên</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead className="bg-gray-100 border-b border-gray-300">
            <tr>
              <th className="py-3 px-4 text-left text-gray-600 font-semibold">ID</th>
              <th className="py-3 px-4 text-left text-gray-600 font-semibold">Tên</th>
              <th className="py-3 px-4 text-left text-gray-600 font-semibold">Email</th>
              <th className="py-3 px-4 text-left text-gray-600 font-semibold">Số Điện Thoại</th>
              <th className="py-3 px-4 text-left text-gray-600 font-semibold">Địa Chỉ</th>
              <th className="py-3 px-4 text-left text-gray-600 font-semibold">Hành Động</th>
            </tr>
          </thead>
          <tbody>
            {/* {customers.map((customer) => (
              <tr key={customer.id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="py-3 px-4">
                  <Link
                    to={`/staffs/${customer.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    {customer.id}
                  </Link>
                </td>
                <td className="py-3 px-4">
                  <Link
                    to={`/customers/${customer.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    {customer.name}
                  </Link>
                </td>
                <td className="py-3 px-4">{customer.email}</td>
                <td className="py-3 px-4">{customer.phone}</td>
                <td className="py-3 px-4">{customer.address}</td>
                <td className="py-3 px-4">
                  <div className="flex space-x-2">
                    <Link
                      to={`/admin/customers/edit/${customer.id}`}
                      className="text-green-600 hover:underline"
                    >
                      Chỉnh sửa
                    </Link>
                    <button
                      onClick={() => handleDelete(customer.id)}
                      className="text-red-600 hover:underline"
                    >
                      Xoá
                    </button>
                  </div>
                </td>
              </tr>
            ))} */}
          </tbody>
        </table>
      </div>
      <div className="mt-8">
        <Link
          to="/admin/staffs/new"
          className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md"
        >
          Tạo Nhân viên Mới
        </Link>
      </div>
    </div>
  );
};

export default StaffList;
