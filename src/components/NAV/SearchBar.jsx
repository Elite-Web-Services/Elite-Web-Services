import React from 'react';
import useProduct from '../hooks/useProduct';
import { useNavigate, useLocation } from 'react-router-dom';

const SearchBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { searchObj, setSearchObj, searchTerm, setSearchTerm } = useProduct();

  return (
    <form
    className="form-inline mt-2 mt-md-0"
      style={{ flexGrow: "1", display: "flex", margin: "0 3rem 0 3rem"}}
      onSubmit={(e) => {
        e.preventDefault();
        setSearchObj({ ...searchObj, query: searchTerm });
        location.pathname === '/manageproducts'
          ? navigate(`/manageproducts?q=${searchTerm}&type=${searchObj.type}`)
          : navigate(`/products?q=${searchTerm}&type=${searchObj.type}`);
      }}
    >
      <input
      className="needs-validation mr-sm-2"
        style={{ flexGrow: "1", padding: ".25rem"}}
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
        }}
      />
      <button type="submit" className="btn btn-outline-success my-2 my-sm-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 2 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mx-3"
        >
          <circle cx="10.5" cy="10.5" r="7.5"></circle>
          <line x1="21" y1="21" x2="15.8" y2="15.8"></line>
        </svg>
      </button>
    </form>
  );
};

export default SearchBar;
