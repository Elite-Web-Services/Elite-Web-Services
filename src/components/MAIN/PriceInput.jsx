import React from "react";
import useProduct from "../hooks/useProduct";

const PriceInput = () => {
  const { searchObj, setSearchObj } = useProduct();

  return (
    <div>
      <input
        type="number"
        placeholder="Minimum Price"
        value={searchObj.priceMin}
        onChange={(event) =>
          setSearchObj({
            ...searchObj,
            min: event.target.value,
          })
        }
      />
      <input
        type="number"
        placeholder="Maximum Price"
        value={searchObj.priceMax}
        onChange={(event) =>
          setSearchObj({
            ...searchObj,
            max: event.target.value,
          })
        }
      />
    </div>
  );
};

export default PriceInput;
