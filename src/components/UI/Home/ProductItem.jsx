import PropTypes from "prop-types";
import LayoutProductItem from "../Product/LayoutProductItem";
import { memo } from "react";
const ProductItem = ({ products }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 lg:gap-6 pb-6">
      {products.length > 0 ? (
        products.slice(0, 4).map((product) => (
          <div key={product.id} className="shadow-md">
            <LayoutProductItem product={product} />
          </div>
        ))
      ) : (
        <></>
      )}
    </div>
  );
};

ProductItem.propTypes = {
  products: PropTypes.any,
};

export default memo(ProductItem);
