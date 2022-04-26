import React, { useState } from "react";
import useProduct from "../hooks/useProduct";

const SearchBar = () => {
  const { params, setSearchParams, searchObj, setSearchObj } = useProduct();

  // this is just to prevent searchObj from changing every time a char is typed
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSearchObj({ ...searchObj, query: searchTerm });
        params.set("q", searchTerm);
        setSearchParams(params);
      }}
    >
      <input
        className="form-control"
        type="text"
        placeholder="Product Search"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
        }}
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchBar;
