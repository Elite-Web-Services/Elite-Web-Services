import React from 'react';
import { Link } from 'react-router-dom';

const ProductsBtn = () => {
  return (
    <div>
      <Link to="/">
        <button>Products</button>
      </Link>
    </div>
  );
};

export default ProductsBtn;
