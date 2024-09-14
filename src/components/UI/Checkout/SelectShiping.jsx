import { Form, Radio } from "antd";
import { useState } from "react";
import { useSelector } from "react-redux";
import { formatCurrency } from "../../../utils/helperFunction";

const SelectShiping = () => {
  const shipping = useSelector((state) => state.cart.shippingFee);
  const paymentMethods = [
    {
      label: "Tiêu chuẩn",
      value: shipping,
      desc: "Đảm bảo nhận hàng từ 3 - 5 ngày",
    },
  ];

  const [value, setValue] = useState(shipping);
  console.log(value);

  const onChange = (e) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };
  return (
    <div className="shipping-content mt-4 mb-6">
      <h2 className="text-xl font-bold pb-3">Phương thức vận chuyển</h2>
      <Form.Item name="payment">
        <Radio.Group
          className="flex flex-col border-t-2"
          onChange={onChange}
          value={value}
        >
          {paymentMethods.map((method, index) => (
            <Radio
              checked={true}
              key={index}
              value={method.value}
              className={`border-x-2 py-4 px-4 border-b-2 relative `}
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

export default SelectShiping;
