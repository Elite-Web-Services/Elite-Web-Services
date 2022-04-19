import React, { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";

const Products = () => {
  const { publicProducts } = useAuth();
  const [filterProducts, setFilterProducts] = useState([]);
  const [productType, setProductType] = useState('');

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
    <div>
      {productType ? <button onClick={()=> setProductType("")}>See all</button>: null}
       <button onClick={()=> setProductType("website")}>Website</button>
       <button onClick={()=> setProductType("web design")}>web design</button>
       <button onClick={()=> setProductType("consultation")}>consultation</button>
    <div id="productList">
      {productType ? <h1>{productType}s</h1> : <h1>Public Products</h1>}
      {filterProducts.map((product) => (
        <div key={product.id}>
          <h2>{product.name}</h2>
          <h3>Category: {product.type}</h3>
          <p>{product.description}</p>
          <p>Price: {product.price}</p>
        </div>
      ))}
    </div>
    </div>
  );
};

export default Products;
