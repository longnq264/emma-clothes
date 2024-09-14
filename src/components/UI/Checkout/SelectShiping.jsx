import { Form, Radio } from "antd";
import { useState } from "react";
import { useSelector } from "react-redux";
import { formatCurrency } from "../../../utils/helperFunction";

const SelectShipping = () => {
  const shipping = useSelector((state) => state.cart.shippingFee);

  // Kiểm tra và đặt giá trị mặc định cho shipping
  const paymentMethods = [
    {
      label: "Tiêu chuẩn",
      value: shipping || 0, // Giá trị mặc định là 0 nếu shipping không có giá trị
      desc: "Đảm bảo nhận hàng từ 3 - 5 ngày",
    },
  ];

  // Đặt giá trị mặc định của radio dựa trên giá trị shipping từ Redux
  const [value, setValue] = useState(shipping || 0);

  const onChange = (e) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value); // Cập nhật lại giá trị đã chọn
  };

  return (
    <div className="shipping-content mt-4 mb-6">
      <h2 className="text-xl font-bold pb-3">Phương thức vận chuyển</h2>
      <Form.Item>
        {" "}
        {/* Sử dụng name là "shipping" */}
        <Radio.Group
          className="flex flex-col border-t-2"
          onChange={onChange}
          value={value} // Giá trị hiện tại của radio
        >
          {paymentMethods.map((method, index) => (
            <Radio
              key={index}
              value={method.value} // Giá trị của mỗi radio
              className="border-x-2 py-4 px-4 border-b-2 relative"
            >
              <p className="pl-2">{method.label}</p>
              <p className="absolute right-4 font-semibold top-4">
                {formatCurrency(method.value)}
              </p>
            </Radio>
          ))}
        </Radio.Group>
      </Form.Item>
    </div>
  );
};

export default SelectShipping;
