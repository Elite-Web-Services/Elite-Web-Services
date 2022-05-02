import React from "react";
import useProduct from "../hooks/useProduct";

const PriceInput = () => {
  const { searchObj, setSearchObj, setPrice, price } = useProduct();

  return (
    <div 
    style={{display: "flex", justifyContent: "right", padding: ".5rem"}}>
    <form
    style={{display: "flex"}}
      onSubmit={(e) => {
        e.preventDefault();
        setSearchObj({ ...searchObj, min: price.min, max: price.max });
      }}
    >
      {/* <label style={{color: "green"}}htmlFor="Min">$</label> */}
      <input
      className="needs-validation mr-sm-2"
      style={{width: "4rem", padding: ".25rem"}}
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
      {/* <label style={{color: "green"}} htmlFor="Max">$</label> */}
      <input
      className="needs-validation mr-sm-2"
      style={{width: "4rem", padding: ".25rem"}}
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
      <button className="btn btn-outline-success my-2 my-sm-0"
      type="submit">Search by Price/hr</button>
    </form>
    </div>
  );
};

export default PriceInput;
