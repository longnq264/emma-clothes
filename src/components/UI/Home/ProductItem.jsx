import PropTypes from "prop-types";
import LayoutProductItem from "../Product/LayoutProductItem";

const ProductItem = ({ products }) => {
  // console.log(products);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 lg:gap-6 px-2 md:px-0 pb-6">
      {products.length > 0 ? (
        products.slice(0, 4).map((product) => (
          <div key={product.id} className="relative shadow-md">
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
export default ProductItem;
