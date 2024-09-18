import { Form, Input } from "antd";
import PropTypes from "prop-types";
const UpdateProductTitleForm = ({ product }) => {
  return (
    <>
      <div className="col-span-full">
        <div className="grid grid-cols-4">
          <div className="pr-6">
            <label
              htmlFor="name"
              className="block text-lg font-medium text-gray-900 pb-2 pl-2"
            >
              Tên sản phẩm
            </label>
            <Form.Item
              initialvalues={{
                name: product?.name,
              }}
              name="name"
              rules={[
                {
                  required: true,
                  message: "Please input!",
                },
              ]}
            >
              <Input
                autoComplete="on"
                placeholder="Nhập tên sản phẩm"
                className="w-full border-gray-300 border-2 rounded-md p-3"
              />
            </Form.Item>
          </div>

          <div className="pr-6">
            <label
              htmlFor="price"
              className="block text-lg font-medium text-gray-900 pb-2 pl-2"
            >
              Giá sản phẩm
            </label>
            <Form.Item
              name="price"
              rules={[
                {
                  required: true,
                  message: "Please input!",
                },
              ]}
            >
              <Input
                placeholder="Price"
                className="w-full border-gray-300 border-2 rounded-md p-3"
              />
            </Form.Item>
          </div>

          <div className="pr-6">
            <label
              htmlFor="price_old"
              className="block text-lg font-medium text-gray-900 pb-2 pl-2"
            >
              Giá cũ
            </label>
            <Form.Item name="price_old">
              <Input
                placeholder="Price Old"
                className="w-full border-gray-300 border-2 rounded-md p-3"
              />
            </Form.Item>
          </div>

          <div className="pr-6">
            <label
              htmlFor="quantity"
              className="block text-lg font-medium text-gray-900 pb-2 pl-2"
            >
              Số lượng
            </label>
            <Form.Item name="quantity">
              <Input
                type="number"
                id="quantity"
                className="w-full border-gray-300 border-2 rounded-md p-3"
                placeholder="Nhập số lượng sản phẩm"
              />
            </Form.Item>
          </div>
        </div>
      </div>
    </>
  );
};

UpdateProductTitleForm.propTypes = {
  product: PropTypes.any,
};
export default UpdateProductTitleForm;
