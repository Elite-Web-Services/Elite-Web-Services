import React, { useState } from "react";
import useProduct from "../hooks/useProduct";

const PriceInput = () => {
  const { searchObj, setSearchObj, setPrice, price } = useProduct();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSearchObj({ ...searchObj, min: price.min, max: price.max });
      }}
    >
      <input
        type="number"
        placeholder="Minimum Price"
        value={price.min}
        onChange={(event) => {
          setPrice({
            ...price,
            min: event.target.value,
          });
        }}
      />
      <input
        type="number"
        placeholder="Maximum Price"
        value={price.max}
        onChange={(event) => {
          setPrice({
            ...price,
            max: event.target.value,
          });
        }}
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default PriceInput;
