import { Button, Form } from "antd";

const SubmitForm = () => {
  return (
    <Form.Item>
      <Button
        className="w-full bg-orange-400 hover:bg-orange-200 py-5 shadow-lg shadow-stone-400/40"
        type="primary"
        htmlType="submit"
      >
        <span className="font-bold text-base text-stone-700">
          Thanh toán
        </span>
      </Button>
    </Form.Item>
  );
};

export default SubmitForm;
