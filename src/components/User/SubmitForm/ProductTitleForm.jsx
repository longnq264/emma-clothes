import { Form } from "antd";
import PropTypes from "prop-types";
const ProductTitleForm = () => {
  return (
    <div className="col-span-full">
      <div className="grid grid-cols-4">
        <Form.Item className="pr-6">
          <label
            htmlFor="product-name"
            className="block text-lg font-medium text-gray-900 pb-2"
          >
            Tên sản phẩm
          </label>
          <input
            type="text"
            name="name"
            id="product-name"
            className="w-full border-gray-300 border-2 rounded-md p-3"
            placeholder="Nhập tên sản phẩm"
            required
          />
        </Form.Item>

        <Form.Item className="pr-6">
          <label
            htmlFor="price"
            className="block text-lg font-medium text-gray-900 pb-2"
          >
            Giá
          </label>
          <input
            type="number"
            name="price"
            id="price"
            //   onChange={handleChange}
            className="w-full border-gray-300 border-2 rounded-md p-3"
            placeholder="Nhập giá sản phẩm"
            required
          />
        </Form.Item>

        <Form.Item className="pr-6">
          <label
            htmlFor="priceOld"
            className="block text-lg font-medium text-gray-900 pb-2"
          >
            Giá cũ
          </label>
          <input
            type="number"
            name="priceOld"
            id="priceOld"
            //   onChange={handleChange}
            className="w-full border-gray-300 border-2 rounded-md p-3"
            placeholder="Nhập giá cũ sản phẩm"
          />
        </Form.Item>

        <Form.Item className="pr-6">
          <label
            htmlFor="quantity"
            className="block text-lg font-medium text-gray-900 pb-2"
          >
            Số lượng
          </label>
          <input
            type="number"
            name="quantity"
            id="quantity"
            //   onChange={handleChange}
            className="w-full border-gray-300 border-2 rounded-md p-3"
            placeholder="Nhập số lượng sản phẩm"
          />
        </Form.Item>
      </div>
    </div>
  );
};

ProductTitleForm.propTypes = {
  product: PropTypes.any,
};
export default ProductTitleForm;
