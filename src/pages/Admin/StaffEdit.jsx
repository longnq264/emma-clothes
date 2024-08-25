import { useState, useEffect } from "react";
import { getUsers, updateUser } from "../../api/api-server";
import { useParams, useNavigate } from "react-router-dom";

const StaffEdit = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getUsers(id);
        setUser(data);
        setName(data.name);
        setEmail(data.email);
        setPassword(data.password);
        setRole(data.role);
        setDateOfBirth(data.date_of_birth);
        setAddress(data.address);
        setPhoneNumber(data.phone_number);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };
    fetchUser();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUser(id, {
        name,
        email,
        password,
        role,
        date_of_birth: dateOfBirth,
        address,
        phone_number: phoneNumber,
      });
      navigate("/admin/staffs");
    } catch (error) {
      console.error("Failed to update user:", error);
    }
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="container mx-auto py-4">
      <h2 className="text-2xl font-bold mb-4">Chỉnh sửa Nhân Viên</h2>
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-md">
        <div className="mb-4">
          <label className="block text-gray-700">Tên</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border rounded w-full py-2 px-3 mt-1"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border rounded w-full py-2 px-3 mt-1"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Mật khẩu</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border rounded w-full py-2 px-3 mt-1"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Ngày sinh</label>
          <input
            type="date"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
            className="border rounded w-full py-2 px-3 mt-1"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Địa chỉ</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="border rounded w-full py-2 px-3 mt-1"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Số điện thoại</label>
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="border rounded w-full py-2 px-3 mt-1"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Vai trò</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="border rounded w-full py-2 px-3 mt-1"
          >
            <option value="user">Người dùng</option>
            <option value="admin">Quản trị viên</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Cập nhật Nhân viên
        </button>
      </form>
    </div>
  );
};

export default StaffEdit;

