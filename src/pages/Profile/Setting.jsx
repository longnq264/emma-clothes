import { useState } from "react";

const Setting = () => {
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
  });

  // Hàm kiểm tra tính hợp lệ của email
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  // Hàm xử lý khi thay đổi giá trị input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  // Hàm xử lý khi gửi form
  const handleSubmit = (e) => {
    e.preventDefault();
    let valid = true;
    const newErrors = { name: "", email: "", password: "" };

    // Kiểm tra từng trường
    if (formValues.name.trim() === "") {
      newErrors.name = "Vui lòng nhập tên!";
      valid = false;
    }
    if (!validateEmail(formValues.email)) {
      newErrors.email = "Vui lòng nhập đúng định dạng email!";
      valid = false;
    }
    if (formValues.password.length < 6) {
      newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự!";
      valid = false;
    }

    setErrors(newErrors);

    if (valid) {
      // Xử lý khi form hợp lệ (ví dụ: gửi lên server)
      console.log("Form đã gửi:", formValues);
    }
  };

  return (
    <div className="w-3/4 p-6">
      <h1 className="text-2xl font-bold mb-4">Cài đặt</h1>
      <div id="profile" className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Cài đặt hồ sơ</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Tên
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formValues.name}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              E-mail
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formValues.email}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Mật khẩu
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formValues.password}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Lưu thay đổi
          </button>
        </form>
      </div>
    </div>
  );
};

export default Setting;
