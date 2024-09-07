import { useEffect, useState } from "react";
import { fetchAttributes } from "../../../api/attributes";
import DropdownItem from "../Home/DropDownItem";
// import PropTypes from "prop-types";
const FilterAttributes = () => {
  const [attributes, setAttributes] = useState();

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

  return (
    <div>
      {attributes ? (
        attributes.map((data) => (
          <DropdownItem title={data.name} key={data.id}>
            <>
              {data.values.map((value) => (
                <div
                  key={value.id}
                  className="basis-1/4 text-center py-2 border border-stone-500 box-border m-2 rounded-xl hover:shadow-lg "
                >
                  <p className="font-bold text-stone-500 text-sm hover:text-stone-300">
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
// FilterAttributes.propTypes = {
//   Props: PropTypes.any,
// };

export default FilterAttributes;
