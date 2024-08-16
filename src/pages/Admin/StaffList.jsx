import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getUsers, deleteUser } from "../../api/api-server";

const StaffList = () => {
  const [users, setUsers] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchUsers();
  }, [keyword, perPage, currentPage]);

  const fetchUsers = async () => {
    try {
      const response = await getUsers({
        keyword,
        per_page: perPage,
        page: currentPage,
      });
      console.log(response); // Kiểm tra dữ liệu trả về
      setUsers(response.data.data || []); // Đảm bảo đúng đường dẫn đến dữ liệu
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

  const handleDelete = async (userId) => {
    try {
      await deleteUser(userId);
      fetchUsers(); // Cập nhật danh sách người dùng sau khi xóa
    } catch (error) {
      console.error("Failed to delete user:", error);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-6">
        Danh Sách Nhân Viên
      </h1>
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Tìm kiếm..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="border rounded-lg p-2 w-1/3"
          />
          <select
            value={perPage}
            onChange={(e) => setPerPage(Number(e.target.value))}
            className="border rounded-lg p-2"
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>
        <Link
          to="/admin/staffs/new"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600"
        >
          Thêm Nhân Viên
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead className="bg-gray-100 border-b border-gray-300">
            <tr>
              <th className="py-3 px-4 text-left text-gray-600 font-semibold">
                ID
              </th>
              <th className="py-3 px-4 text-left text-gray-600 font-semibold">
                Tên
              </th>
              <th className="py-3 px-4 text-left text-gray-600 font-semibold">
                Email
              </th>
              <th className="py-3 px-4 text-left text-gray-600 font-semibold">
                Số Điện Thoại
              </th>
              <th className="py-3 px-4 text-left text-gray-600 font-semibold">
                Địa Chỉ
              </th>
              <th className="py-3 px-4 text-left text-gray-600 font-semibold">
                Vai Trò
              </th>
              <th className="py-3 px-4 text-left text-gray-600 font-semibold">
                Ngày Sinh
              </th>
              <th className="py-3 px-4 text-left text-gray-600 font-semibold">
                Hành Động
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                className="border-b border-gray-200 hover:bg-gray-50"
              >
                <td className="py-3 px-4">
                  <Link
                    to={`/staffs/${user.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    {user.id}
                  </Link>
                </td>
                <td className="py-3 px-4">
                  <Link
                    to={`/staffs/${user.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    {user.name}
                  </Link>
                </td>
                <td className="py-3 px-4">{user.email}</td>
                <td className="py-3 px-4">{user.phone_number}</td>
                <td className="py-3 px-4">{user.address}</td>
                <td className="py-3 px-4">{user.role}</td>
                <td className="py-3 px-4">{new Date(user.date_of_birth).toLocaleDateString()}</td>
                <td className="py-3 px-4">
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="text-red-600 hover:underline"
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between mt-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg"
          disabled={currentPage <= 1}
        >
          Trước
        </button>
        <button
          onClick={() => setCurrentPage((prev) => prev + 1)}
          className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg"
        >
          Tiếp
        </button>
      </div>
    </div>
  );
};

export default StaffList;
