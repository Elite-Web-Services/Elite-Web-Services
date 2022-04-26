import React, { useState, useEffect } from "react";
import {
  getAllProducts,
  getPublicProducts,
  getAllTypes,
} from "../../axios-services";
import { useLocation, useSearchParams } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export const ProductContext = React.createContext();

const ProductProvider = ({ children }) => {
  const { user, token } = useAuth();

  let location = useLocation();
  const params = new URLSearchParams(location.search)
  const [searchParams, setSearchParams] = useSearchParams()

  const [products, setProducts] = useState([]);
  const [types, setTypes] = useState([]);
  const [searchObj, setSearchObj] = useState({
      query: "",
      type: "",
  })
  const [filterProducts, setFilterProducts] = useState([]);

  // GET ALL PRODUCTS
  useEffect(() => {
    if (user.isAdmin) {
      const displayAllProducts = async () => {
        const data = await getAllProducts(token);
        setProducts(data);
      };
      displayAllProducts();
    } else {
      const displayPublicProducts = async () => {
        const data = await getPublicProducts();
        setProducts(data);
      };
      displayPublicProducts();
    }
  }, [user, token]);

  // GET ALL TYPES
  useEffect(() => {
    const displayAllTypes = async () => {
      const data = await getAllTypes();
      setTypes(data);
    };
    displayAllTypes();
  }, []);

// CHECK ON STATES
useEffect(() => {
console.log(searchObj)
  }, [location.search]);

  // FILTER POSTS
  useEffect(() => {
    setFilterProducts(products);
    console.log(filterProducts)

    if (searchObj.type) {
      setFilterProducts(
        filterProducts.filter((product) => product.typeName === searchObj.type)
      );
    }

    if (searchObj.query) {
      setFilterProducts(
        filterProducts.filter((product) => product.name.includes(searchObj.query))
      );
    }
  }, [products, searchObj]);

  return (
    <ProductContext.Provider
      value={{
        products,
        setProducts,
        types,
        setTypes,
        params,
        searchParams,
        setSearchParams,
        searchObj,
        setSearchObj,
        filterProducts
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
