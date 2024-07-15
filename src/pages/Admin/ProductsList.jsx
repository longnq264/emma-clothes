import { useEffect } from "react";
import { getCategories } from "../../api/api-server";

const Products = () => {
  const getList = async () => {
    try {
      const response = await getCategories();
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getList();
  });
  return (
    <div>
      List Products
      <div className=""></div>
    </div>
  );
};

export default Products;
