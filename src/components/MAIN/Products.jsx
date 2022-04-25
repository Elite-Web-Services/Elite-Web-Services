import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import useCart from '../hooks/useCart';
import ProductCard from './ProductCard';


const Products = () => {
  let location = useLocation();
  if (location.search) {
    console.log("SEARCH: ", location.search);
  }

  const { token, products, user, types } = useAuth();
  const { cart, setCart } = useCart();
  const [filterProducts, setFilterProducts] = useState([]);
  const [productType, setProductType] = useState("");

  useEffect(() => {
    if (productType) {
      setFilterProducts(
        products.filter((products) => products.typeName === productType)
      );
    } 
    if (location.search) {
      const queryParams = new URLSearchParams(location.search);
      for (const [key, value] of queryParams) {
        console.log(key, "this is the value HERE", value)
        setFilterProducts(filterProducts.filter((product) => product.name.includes(value)))
      }
      const singleValue = queryParams.get('value')
      console.log(singleValue)
    }
    if (!productType && !location.search) {
      setFilterProducts(products);
    }
  }, [products, productType, location.search]);

  return (
    <div>
      {productType ? (
        <button onClick={() => setProductType("")}>See all</button>
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
                onClick={() => setProductType(type.name)}
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
              {productType ? <h1>{productType}</h1> : <h1>All Products</h1>}
              {filterProducts.map((product) => (
                <div key={"productList:" + product.id} className="col-md-4">
                  <ProductCard product={product} productType={productType}/>
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
