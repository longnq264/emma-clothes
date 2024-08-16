import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getUserId, updateUser } from '../../api/api-server';
import axios from 'axios';

const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'your_preset_name'); 

  try {
    const response = await axios.post('https://api.cloudinary.com/v1_1/your_cloud_name/image/upload', formData);
    return response.data.secure_url;
  } catch (error) {
    console.error('Image upload failed:', error);
    throw error;
  }
};

const StaffEdit = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone_number: '',
    address: '',
    avatar: null,
    password: '',
    re_password: '',
    role: '',
  });
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getUserId(id);
        setFormData(response || {});
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };

    fetchUser();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('name', formData.name);
    data.append('email', formData.email);
    data.append('phone_number', formData.phone_number);
    data.append('address', formData.address);

    if (formData.password) {
      data.append('password', formData.password);
    }
    if (formData.re_password) {
      data.append('re_password', formData.re_password);
    }
    data.append('role', formData.role);

    if (formData.avatar) {
      try {
        const avatarUrl = await uploadImage(formData.avatar);
        data.append('avatar', avatarUrl);
      } catch (error) {
        console.error('Image upload failed:', error);
        return;
      }
    }

    try {
      await updateUser(id, data);
      navigate('/staffs');
    } catch (error) {
      console.error("Failed to update user:", error);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-6">Chỉnh Sửa Nhân Viên</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Tên:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="border rounded-lg p-2 w-full"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="border rounded-lg p-2 w-full"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Số Điện Thoại:</label>
          <input
            type="text"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleInputChange}
            className="border rounded-lg p-2 w-full"
          />
        </div>
        <div>
          <label className="block text-gray-700">Địa Chỉ:</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            className="border rounded-lg p-2 w-full"
          />
        </div>
        <div>
          <label className="block text-gray-700">Mật Khẩu:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className="border rounded-lg p-2 w-full"
          />
        </div>
        <div>
          <label className="block text-gray-700">Nhập Lại Mật Khẩu:</label>
          <input
            type="password"
            name="re_password"
            value={formData.re_password}
            onChange={handleInputChange}
            className="border rounded-lg p-2 w-full"
          />
        </div>
        <div>
          <label className="block text-gray-700">Vai Trò:</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleInputChange}
            className="border rounded-lg p-2 w-full"
            required
          >
            <option value="">Chọn Vai Trò</option>
            <option value="admin">Quản Trị</option>
            <option value="user">Người Dùng</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-700">Ảnh Đại Diện:</label>
          <input
            type="file"
            name="avatar"
            accept="image/*"
            onChange={handleInputChange}
            className="border rounded-lg p-2 w-full"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          Cập Nhật Nhân Viên
        </button>
      </form>
    </div>
  );
};

export default StaffEdit;
