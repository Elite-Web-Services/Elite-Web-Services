import React, { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";

const Products = () => {
  const { publicProducts } = useAuth();
  const [filterProducts, setFilterProducts] = useState([]);

  let productType = "website"

  useEffect(() => {
    if (productType) {
      setFilterProducts(
        publicProducts.filter(
          (publicProducts) => publicProducts.type === productType
        )
      );
    } else {
      setFilterProducts(publicProducts);
    }
  }, [publicProducts, productType]);

  return (
    <div id="productList">
      {/* productType ? <h1>{productType}</h1> : <h1>Public Products</h1> */}
      {filterProducts.map((product) => (
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
