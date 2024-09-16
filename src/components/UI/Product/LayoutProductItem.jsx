import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { formatCurrency } from "../../../utils/helperFunction";
import ProductImage from "./ProductImage";
const LayoutProductItem = ({ product }) => {
  return (
    <>
      <NavLink to={`/products/${product.id}`}>
        <ProductImage images={product.productImages} />
        <div className="px-2 md:px-4 pb-4">
          <h2 className="font-semibold mt-4 text-sm xs:h-16 sm:h-16 lg:h-10">
            {product.name}
          </h2>
          <p className="pt-2">{formatCurrency(product.price)}</p>
        </div>
      </NavLink>
    </>
  );
};

LayoutProductItem.propTypes = {
  product: PropTypes.any,
};
export default LayoutProductItem;
