import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { formatCurrency } from "../../../utils/helperFunction";
import ProductImage from "./ProductImage";
const ListProduct = ({ quantityProduct, paginatedProducts }) => {
  // console.log("paginatedProducts", paginatedProducts);
  return (
    <div className="min-h-screen md:basis-4/5">
      <div className="pl-10">
        <div className="mx-2 py-2">
          <p className="font-bold text-stone-600">{quantityProduct} sản phẩm</p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {paginatedProducts.map((res) => (
            <NavLink key={res.id} to={`/products/${res.id}`}>
              <div className="mx-2 my-2 pb-4 shadow-md">
                {/* <img src={res.productImages[0].image_url} /> */}
                <ProductImage images={res.productImages} />
                <div className="content-product px-4 py-2">
                  <h3 className="h-10 box-border text-sm font-semibold text-stone-700 pt-2">
                    {res.name}
                  </h3>
                  <h1 className="price text-base font-semibold mt-4 text-stone-700">
                    {formatCurrency(res.price)}
                    <span className="text-stone-400 font-semibold my-2 ml-2 line-through text-sm">
                      {formatCurrency(res.price_old)}
                    </span>
                  </h1>
                </div>
              </div>
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
};
ListProduct.propTypes = {
  quantityProduct: PropTypes.any,
  paginatedProducts: PropTypes.any,
};

export default ListProduct;
