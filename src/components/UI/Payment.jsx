import { Form, Radio } from "antd";

const Payment = () => {
  const paymentMethods = [
    { label: "Tiền mặt (COD)", value: "cash_on_delivery" },
    { label: "Ví điện tử VNPAY", value: "bank_transfer" },
    { label: "Thẻ nội địa hoặc ngân hàng", value: "credit_card" },
  ];

  return (
    <Form.Item name="paymentMethod">
      <h2 className="text-xl">Phương thức thanh toán</h2>
      <p className="text-sm text-gray-500 py-2">
        Lựa chọn phương thức thanh toán phù hợp nhất cho bạn
      </p>
      <Radio.Group className="flex flex-col">
        {paymentMethods.map((method) => (
          <Radio
            key={method.value}
            value={method.value}
            className="border-2 py-4 px-2"
          >
            {method.label}
          </Radio>
        ))}
      </Radio.Group>
    </Form.Item>
  );
};

export default Payment;
