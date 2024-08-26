import { useEffect, useState } from "react";
import { getCategories } from "../../../api/api-server";
import { Form, Input, Select } from "antd";

const { Option, OptGroup } = Select;

const GetListCategories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategories();

        setCategories(response.data[0]?.children || []);
      } catch (error) {
        console.error("Lỗi không lấy được danh mục:", error);
      }
    };

    fetchCategories();
  }, []);
  return (
    <div className="col-span-full">
      <div className="flex">
        <div className="w-1/4">
          <h2 className="pb-2 text-lg">Danh mục</h2>
          <div className="">
            <Form.Item
              name="category"
              rules={[{ required: true, message: "Vui lòng chọn danh mục!" }]}
            >
              <Select placeholder="Chọn danh mục">
                {categories.length > 0 ? (
                  categories.map((cat) => (
                    <OptGroup key={cat.id} label={cat.name}>
                      {cat.children && cat.children.length > 0 ? (
                        cat.children.map((subCat) => (
                          <Option key={subCat.id} value={subCat.id}>
                            {subCat.name}
                          </Option>
                        ))
                      ) : (
                        <Option key={cat.id} value={cat.id}>
                          {cat.name}
                        </Option>
                      )}
                    </OptGroup>
                  ))
                ) : (
                  <></>
                )}
              </Select>
            </Form.Item>
          </div>
        </div>
        <div className="w-3/4 pl-20">
          <h2 className="text-lg pb-2">Description</h2>
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
