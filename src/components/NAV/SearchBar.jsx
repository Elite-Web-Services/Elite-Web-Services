import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const SearchBar = () => {
  let location = useLocation();
  console.log(location.search)
  const [search, setSearch] = useState('');
  return (
    <form action="/products" method="get"
    onSubmit={(e)=> {
      e.preventDefault()
      location.search="hello"
      setSearch("hello")
    }}>
      <input
        className="form-control"
        type="text"
        placeholder="Product Search"
        name="search"
      />
      <input type="submit" value="Search"></input>
    </form>
  );
};

export default SearchBar;
