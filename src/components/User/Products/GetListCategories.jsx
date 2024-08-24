import { useEffect, useState } from "react";
import { getCategories } from "../../../api/api-server";

const GetListCategories = (product) => {
  console.log(product);

  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategories();
        console.log(response);

        setCategories(response.data[0]?.children || []);
      } catch (error) {
        console.error("Lỗi không lấy được danh mục:", error);
      }
    };

    fetchCategories();
  }, []);
  return (
    <div className="col-span-full">
      <label
        htmlFor="category"
        className="block text-lg font-medium text-gray-900 pb-2"
      >
        Danh mục
      </label>
      <select
        id="category"
        name="category"
        value={product.category}
        // onChange={handleChange}
        className="w-1/4 border-gray-300 border-2 rounded-md p-3"
        required
      >
        <option value="">Chọn danh mục</option>
        {categories.length > 0 ? (
          categories.map((cat) => (
            <optgroup key={cat.id} label={cat.name}>
              {cat.children && cat.children.length > 0 ? (
                cat.children.map((subCat) => (
                  <option key={subCat.id} value={subCat.id}>
                    {subCat.name}
                  </option>
                ))
              ) : (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              )}
            </optgroup>
          ))
        ) : (
          <option disabled>Không có danh mục</option>
        )}
      </select>
    </div>
  );
};

export default GetListCategories;
