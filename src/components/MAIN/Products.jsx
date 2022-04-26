import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useProduct from "../hooks/useProduct";
import ProductCard from "./ProductCard";

const Products = () => {
  const { user } = useAuth();
  const {
    products,
    types,
    searchObj,
    setSearchObj,
    params,
    setSearchParams,
    filterProducts,
  } = useProduct();

  return (
    <div>
      {params.get("type") ? (
        <button
          onClick={() => {
            setSearchObj({ ...searchObj, type: "" });
            params.set("type", "");
            setSearchParams(params);
          }}
        >
          See all
        </button>
      ) : null}
      {user.isAdmin ? (
        <Link to="/createproduct">
          <button>Add New Product</button>
        </Link>
      ) : null}

      {/* Map out the type buttons */}
      {types ? (
        <div id="typeList">
          {types.map((type, index) => {
            return (
              <button
                key={`typeList: ${index}`}
                onClick={() => {
                  setSearchObj({ ...searchObj, type: type.name });
                  params.set("type", type.name);
                  setSearchParams(params);
                }}
              >
                {type.name}
              </button>
            );
          })}
        </div>
      ) : null}

      {Array.isArray(filterProducts) ? (
        <div id="productList" className="album py-5 bg-light">
          <div className="container">
            <div className="row">
              {params.get("type") ? (
                <h1>{params.get("type")}</h1>
              ) : (
                <h1>All Products</h1>
              )}
              {filterProducts.map((product) => (
                <div key={"productList:" + product.id} className="col-md-4">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <h5>Sorry, we couldn't find anything that matched your search!</h5>
      )}
    </div>
  );
};

export default Products;
