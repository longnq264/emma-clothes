import PropTypes from "prop-types";
import { formatCurrency } from "../../../utils/helperFunction";
import ProductImage from "./ProductImage";
import { memo } from "react";

const ListProduct = memo(function ListProduct({
  quantityProduct,
  paginatedProducts,
}) {
  const customText = (text) => {
    if (text.length > 10) {
      return text.slice(0, 15) + "..";
    } else {
      return text;
    }
  };

  console.log("paginatedProducts", paginatedProducts);
  return (
    <div className="min-h-screen md:basis-4/5">
      <div className="lg:pl-10">
        <div className="mx-2 py-2">
          <p className="font-bold text-stone-600">{quantityProduct} sản phẩm</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 lg:gap-6 pb-6">
          {paginatedProducts.map((res) => (
            <div key={res.id} className="shadow-md">
              <div className="product-item flex flex-col justify-between h-full">
                <ProductImage images={res.productImages} productId={res.id} />
                <div className="px-4 py-4">
                  <h2 className="font-semibold text-sm">
                    {customText(res.name)}
                    {/* {res.name} */}
                  </h2>
                  <p className="">{formatCurrency(res.price)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

ListProduct.propTypes = {
  quantityProduct: PropTypes.any,
  paginatedProducts: PropTypes.any,
};

export default ListProduct;
