import React, { useState } from "react";
import useProduct from "../hooks/useProduct";

const PriceInput = () => {
  const { searchObj, setSearchObj, setPrice, price } = useProduct();

  return (
    <form
    style={{justifySelf: "right"}}
      onSubmit={(e) => {
        e.preventDefault();
        setSearchObj({ ...searchObj, min: price.min, max: price.max });
      }}
    >
      <label htmlFor="Min">$</label>
      <input
      style={{width: "4rem"}}
        type="number"
        placeholder="Min"
        value={price.min}
        onChange={(event) => {
          setPrice({
            ...price,
            min: event.target.value,
          });
        }}
      />
      <label htmlFor="Max">$</label>
      <input
      style={{width: "4rem"}}
        type="number"
        placeholder="Max"
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
