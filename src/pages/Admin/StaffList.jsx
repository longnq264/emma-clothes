import { useState, useEffect } from "react";
import { getUsers, deleteUser } from "../../api/api-server";
import { Link } from "react-router-dom";

const StaffList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await getUsers();
      if (response && response.data) {
        setUsers(response.data.data); // response.data.data chứa danh sách user ( nhân viên)
      }
    } catch (error) {
      console.error("Thất bại, không nạp được người dùng ", error);
    }
  };

  const handleDelete = async (userId) => {
    try {
      await deleteUser(userId);
      fetchUsers(); // Làm mới danh sách sau khi xóa
    } catch (error) {
      console.error("Failed to delete user:", error);
    }
  };

  return (
    <div className="container mx-auto py-4">
      <h2 className="text-2xl font-bold mb-4">Danh sách người dùng</h2>
      <Link
        to="/admin/staffs/new"
        className="bg-green-500 text-white px-4 py-2 rounded mb-4"
      >
        Thêm người dùng
      </Link>
      <br />
      <br />
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Tên</th>
            <th className="py-2 px-4 border-b">Avatar</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Vai trò</th>
            <th className="py-2 px-4 border-b">Sửa</th>
            <th className="py-2 px-4 border-b">Xóa</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan="7" className="py-2 px-4 text-center">
                Không có dữ liệu
              </td>
            </tr>
          ) : (
            users.map((user) => (
              <tr key={user.id}>
                <td className="py-2 px-4 border-b">{user.id}</td>
                <td className="py-2 px-4 border-b">{user.name}</td>
                <td className="py-2 px-4 border-b">
                  <img
                    src={user.avatar || "default-avatar.png"}
                    alt="avatar"
                    className="w-10 h-10 rounded-full"
                  />
                </td>
                <td className="py-2 px-4 border-b">{user.email}</td>
                <td className="py-2 px-4 border-b">{user.role}</td>
                <td className="py-2 px-4 border-b">
                  <Link
                    to={`/admin/staffs/edit/${user.id}`}
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                  >
                    Sửa
                  </Link>
                </td>
                <td className="py-2 px-4 border-b">
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default StaffList;
