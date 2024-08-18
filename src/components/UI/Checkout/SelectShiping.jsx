import { Radio } from "antd";
import { useSelector } from "react-redux";

const SelectShiping = () => {
  const shipping = useSelector((state) => state.cart.shippingFee);
  const paymentMethods = [
    {
      label: "Tiêu chuẩn",
      value: shipping,
      desc: "Đảm bảo nhận hàng từ 3 - 5 ngày",
    },
  ];
  return (
    <div className="shipping-content mt-4 mb-6">
      <h2 className="text-xl font-bold pb-3">Phương thức vận chuyển</h2>
      <Radio.Group className="flex flex-col border-t-2">
        {paymentMethods.map((method) => (
          <Radio
            key={method.value}
            value={method.value}
            className={`border-x-2 py-4 px-4 border-b-2 relative`}
          >
            <p className="pl-2">{method.label}</p>
            <p className="absolute right-4 font-semibold top-4">
              {Number(method.value).toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}
            </p>
          </Radio>
        ))}
      </Radio.Group>
    </div>
  );
};

export default SelectShiping;
