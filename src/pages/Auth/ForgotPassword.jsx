import { useState } from 'react'
import axios from "axios";
import { message } from 'antd'

const ForgotPassword = () => {
  const [email, setEmail] = useState('')

  const handleSubmit = async () => {
    // Kiểm tra nếu email trống
    if (!email) {
      message.warning("Vui lòng nhập email của bạn");
      return;
    }

    // Kiểm tra định dạng email
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email)) {
      message.warning("Vui lòng nhập địa chỉ email hợp lệ");
      return;
    }

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/forgetpassword', {
        email: email
      }, {
        headers: {
          'Content-Type': 'application/json',
        }
      })
      message.success(response.data.message || "Yêu cầu đã được gửi thành công")
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        message.error(error.response.data.message)
      } else if (error.request) {
        message.error("Không thể kết nối đến máy chủ. Vui lòng thử lại sau.");
      } else {
        message.error("Có lỗi xảy ra, vui lòng kiểm tra email")
      }
    }
  }

  return (
    <div className="mt-20">
      <div className="container mx-auto">
        <div className="wrap-content flex justify-center">
          <div className="bg-white bg-opacity-20 w-96 p-10 rounded-lg shadow-2xl">
            <h1 className="font-bold text-center text-white text-3xl mb-10 ">
              Quên mật khẩu
            </h1>
            <form action="" className="w-full">
              <div>
                <input
                  name="email"
                  type="text"
                  className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md 
                            text-sm shadow-sm placeholder-slate-400
                            focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                            invalid:border-pink-500 invalid:text-pink-600
                            focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                  placeholder="Nhập email"
                  onChange={(e) => { setEmail(e.target.value) }}
                />
                <button 
                  type="button" 
                  onClick={handleSubmit} 
                  className={`w-full p-1 mt-2 rounded-md text-white ${
                    email ? 'bg-orange-400 hover:bg-orange-500' : 'bg-gray-400 cursor-not-allowed'
                  }`}
                  disabled={!email}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
