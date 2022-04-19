import React from "react";
import useAuth from "./hooks/useAuth";

const Products = () => {
  const { publicProducts } = useAuth();

  return (
    <div id="productList">
      <h1>Public Products</h1>
      {publicProducts.map((product) => (
        <div key={product.id}>
          <h2>{product.name}</h2>
          <h3>Category: {product.type}</h3>
          <p>{product.description}</p>
          <p>Price: {product.price}</p>
        </div>
      ))}
    </div>
  );
};

export default Products;