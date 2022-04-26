import React from "react";
import useProduct from "../hooks/useProduct";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const navigate = useNavigate();
  const { searchObj, setSearchObj, searchTerm, setSearchTerm } =
    useProduct();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSearchObj({ ...searchObj, query: searchTerm });
        navigate(`/products?q=${searchTerm}&type=${searchObj.type}`);
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