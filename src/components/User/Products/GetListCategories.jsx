import { Form, Input } from "antd";
import TreeDataExample from "./TreeCategories";

const GetListCategories = () => {
  return (
    <div className="col-span-full">
      <div className="flex">
        <div className="w-1/4">
          <TreeDataExample />
        </div>
        <div className="w-3/4 pl-20">
          <h2 className="text-lg font-medium text-gray-900 pb-2">Nhập mô tả</h2>
          <Form.Item
            name="description"
            rules={[
              {
                required: true,
                message: "Please input!",
              },
            ]}
          >
            <Input.TextArea placeholder="Nhap mo ta ..." />
          </Form.Item>
        </div>
      </div>
    </div>
  );
};

export default GetListCategories;
