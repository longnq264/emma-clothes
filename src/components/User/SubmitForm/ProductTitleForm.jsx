import { Form, Input } from "antd";

const ProductTitleForm = () => {
  return (
    <div className="col-span-full">
      <div className="grid grid-cols-4">
        <div className="pr-6">
          <label
            htmlFor="product-name"
            className="block text-lg font-medium text-gray-900 pb-2"
          >
            Tên sản phẩm
          </label>
          <Form.Item
            name="name"
            rules={[
              {
                required: true,
                message: "Please input!",
              },
            ]}
          >
            <Input
              placeholder="Nhập tên sản phẩm"
              className="w-full border-gray-300 border-2 rounded-md p-3"
            />
          </Form.Item>
        </div>

        <div className="pr-6">
          <label
            htmlFor="product-price"
            className="block text-lg font-medium text-gray-900 pb-2"
          >
            Price
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
            htmlFor="priceOld"
            className="block text-lg font-medium text-gray-900 pb-2"
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
            className="block text-lg font-medium text-gray-900 pb-2"
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
  );
};

export default ProductTitleForm;