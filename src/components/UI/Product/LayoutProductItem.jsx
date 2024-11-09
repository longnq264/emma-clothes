import PropTypes from "prop-types";
import ProductImage from "./ProductImage";
import ProductDescription from "./ProductDescription";
import { memo } from "react";
const LayoutProductItem = ({ product }) => {
  return (
    <div className="product-item flex flex-col justify-between h-full">
      <ProductImage productId={product.id} images={product.productImages} />
      <ProductDescription product={product} />
    </div>
  );
};

LayoutProductItem.propTypes = {
  product: PropTypes.any,
};
export default memo(LayoutProductItem);
