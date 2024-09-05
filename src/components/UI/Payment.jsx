import { Form, Radio } from "antd";

const Payment = () => {
  const paymentMethods = [
    { label: "Tiền mặt (COD)", payment: "COD" },
    {
      label: "Thanh toán thẻ nội địa",
      payment: "online_card",
    },
    {
      label: "Thanh toán thẻ quốc tế",
      payment: "online_visa",
    },
    {
      label: "Lựa chọn thanh toán khác",
      payment: "online",
    },
  ];

  return (
    <Form.Item name="payment">
      <div className="payment-content">
        <h2 className="text-xl font-bold">Phương thức thanh toán</h2>
        <p className="text-sm text-gray-500 py-2">
          Lựa chọn phương thức thanh toán phù hợp nhất cho bạn
        </p>
        <Radio.Group className="flex flex-col border-t-2 my-2">
          {paymentMethods.map((method, index) => (
            <Radio
              key={index}
              value={method.payment}
              className={`border-x-2 py-4 px-4 border-b-2`}
            >
              <p className="pl-2">{method.label}</p>
            </Radio>
          ))}
        </Radio.Group>
      </div>
    </Form.Item>
  );
};

export default Payment;
