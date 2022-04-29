import React from "react";
import useProduct from "../hooks/useProduct";
import ProductCard from "./ProductCard";
import TypeButtons from "./TypeButtons";
import PriceInput from "./PriceInput";

const Products = () => {
  const { searchObj, filterProducts } = useProduct();

  return (
    <div>
      <div
      // className="navbar-dark bg-dark"
      style={{marginBottom: "1rem", position: "sticky", top: "0", zIndex: "100"}}>
      <TypeButtons />
      <PriceInput />
      </div>

      {Array.isArray(filterProducts) && filterProducts.length? (
        <div id="productList" >
          <div className="container" >
            <div className="row" >
              {/* {searchObj.type ? (
                <h1>{searchObj.type}</h1>
              ) : (
                <h1>All Products</h1>
              )} */}
              {filterProducts.map((product) => (
                <div key={"productList:" + product.id} className="col-md-4" >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <h5 style={{display: "flex", margin: "4rem", justifyContent: "center" }}>Sorry, we couldn't find anything that matched your search!</h5>
      )}
    </div>
  );
};

export default Products;
