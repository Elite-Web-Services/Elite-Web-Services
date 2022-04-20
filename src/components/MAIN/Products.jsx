import React, { useState, useEffect } from "react";
import EditProduct from "./EditProduct";
import useAuth from "../hooks/useAuth";
import { getAllTypes } from "../../axios-services";

const Products = () => {
  const { publicProducts } = useAuth();
  const [filterProducts, setFilterProducts] = useState([]);
  const [productType, setProductType] = useState("");
  const [types, setTypes] = useState([])

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

  useEffect(() => {
    const displayAllTypes = async () => {
      const data = await getAllTypes();
      setTypes(data);
    };
    displayAllTypes();
  }, []);

  return (
    <div>
      {productType ? (
        <button onClick={() => setProductType("")}>See all</button>
      ) : null}
      {/* Map out the type buttons */}
      {types.map((type, index) => {
        return (
          <button
            key={`typeList: ${index}`}
            onClick={() => setProductType(type.name)}
          >
            {type.name}
          </button>
        );
      })}
      <div id="productList">
        {productType ? <h1>{productType}</h1> : <h1>Public Products</h1>}
        {filterProducts.map((product) => (
          <div key={"productList:" + product.id}>
            <h2>{product.name}</h2>
            <h3>Category: {product.typeName}</h3>
            <p>{product.description}</p>
            <p>Price: {product.price}</p>
            <EditProduct product={product} types={types} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
