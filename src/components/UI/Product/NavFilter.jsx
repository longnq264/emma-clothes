import DropdownItem from "../Home/DropDownItem";
import PropTypes from "prop-types";
import FilterAttributes from "./FilterAttributes";

const priceRanges = [
  { label: "Dưới 350.000đ", min: 0, max: 350000 },
  { label: "350.000đ - 750.000đ", min: 350000, max: 750000 },
  { label: "750.000đ - 1.000.000đ", min: 750000, max: 1000000 },
];

const NavFilter = ({
  selectedPriceRange,
  setSelectedPriceRange,
  categoryId,
  id,
  setProducts,
}) => {
  const handlePriceRangeChange = (item) => {
    if (selectedPriceRange && selectedPriceRange.label === item.label) {
      setSelectedPriceRange(null);
    } else {
      setSelectedPriceRange(item);
    }
  };
  return (
    <>
      <div className="basis-1/5 max-h-screen overflow-y-auto">
        <h1 className="uppercase font-bold text-2xl text-stone-700 mb-14">
          {id ? (
            <span className="text-4xl">{categoryId?.name}</span>
          ) : (
            "Tất cả sản phẩm"
          )}
        </h1>
        <div className="my-2">
          <h1 className="font-bold text-2xl">Bộ lọc</h1>
          <div>
            <ul className="text-stone-800">
              <FilterAttributes setProducts={setProducts} />
              <DropdownItem title="Theo giá">
                {priceRanges.map((item) => (
                  <label
                    key={item.label}
                    className="flex items-center my-2 hover:bg-stone-100 py-2 rounded-lg"
                  >
                    <input
                      type="checkbox"
                      className="mr-4 w-4 h-4 border-slate-500"
                      checked={
                        selectedPriceRange
                          ? selectedPriceRange.label === item.label
                          : false
                      }
                      onChange={() => handlePriceRangeChange(item)}
                    />
                    {item.label}
                  </label>
                ))}
              </DropdownItem>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

NavFilter.propTypes = {
  selectedPriceRange: PropTypes.any,
  setSelectedPriceRange: PropTypes.any,
  categoryId: PropTypes.any,
  id: PropTypes.any,
  setProducts: PropTypes.any,
};

export default NavFilter;
