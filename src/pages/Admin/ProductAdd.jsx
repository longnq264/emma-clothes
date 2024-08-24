import { useNavigate } from "react-router-dom";
import { Button, Form } from "antd";
import AttributesProduct from "../../components/User/Products/AttributesProduct";
import ProductTitleForm from "../../components/User/SubmitForm/ProductTitleForm";
import GetListCategories from "../../components/User/Products/GetListCategories";

const ProductAdd = () => {
  const navigate = useNavigate();

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="pl-4 text-4xl font-extrabold pb-4">Thêm Sản Phẩm</h1>
      <Form
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        className="space-y-8 bg-white shadow-lg rounded-lg p-8"
      >
        <ProductTitleForm />

        <GetListCategories />

        <AttributesProduct />

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Add Product
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ProductAdd;

