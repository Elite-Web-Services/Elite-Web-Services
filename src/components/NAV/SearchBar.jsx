import React, { useState } from 'react';

const SearchBar = () => {
  const [search, setSearch] = useState('');
  return (
    <form action="/products" method="get">
      <input
        class="form-control"
        type="text"
        placeholder="Product Search"
        name="s"
      />
    </form>
  );
};

export default SearchBar;