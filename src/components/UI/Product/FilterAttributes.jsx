import { useEffect, useState } from "react";
import { fetchAttributes, filterAtrributes } from "../../../api/attributes";
import DropdownItem from "../Home/DropDownItem";
import PropTypes from "prop-types";
const FilterAttributes = ({ setProducts }) => {
  const [attributes, setAttributes] = useState();
  const [selectedFilters, setSelectedFilters] = useState({});

  const getAttributes = async () => {
    try {
      const response = await fetchAttributes();
      setAttributes(response.data);
    } catch (error) {
      console.log(error.error);
    }
  };

  useEffect(() => {
    getAttributes();
  }, []);

  const handleFilterAttributes = (attributeId, valueId) => {
    // Cập nhật trạng thái bộ lọc
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [attributeId]: valueId,
    }));
  };

  const fetchFilteredProducts = async () => {
    const queryParams = Object.keys(selectedFilters)
      .map(
        (attributeId) =>
          `attribute[${attributeId}][]=${selectedFilters[attributeId]}`
      )
      .join("&");
    // console.log(queryParams);

    try {
      const response = await filterAtrributes(queryParams);
      const data = await response.data;
      // console.log("Filtered products:", data);
      setProducts(data);
    } catch (error) {
      console.log("Error fetching filtered products:", error);
    }
  };

  // Gọi hàm fetchFilteredProducts mỗi khi selectedFilters thay đổi
  useEffect(() => {
    if (Object.keys(selectedFilters).length > 0) {
      fetchFilteredProducts();
    }
  }, [selectedFilters]);

  return (
    <div>
      {attributes ? (
        attributes.map((data) => (
          <DropdownItem title={data.name} key={data.id}>
            <>
              {data.values.map((value) => (
                <div
                  key={value.id}
                  className="basis-1/4 text-center py-2 border border-stone-500 box-border m-2 rounded-xl hover:shadow-lg"
                >
                  <p
                    className="font-bold text-stone-500 text-sm hover:text-stone-300"
                    onClick={() =>
                      handleFilterAttributes(value.attribute_id, value.id)
                    }
                  >
                    {value.value}
                  </p>
                </div>
              ))}
            </>
          </DropdownItem>
        ))
      ) : (
        <>No data</>
      )}
    </div>
  );
};
FilterAttributes.propTypes = {
  setProducts: PropTypes.any,
};

export default FilterAttributes;
