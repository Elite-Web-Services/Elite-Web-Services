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
  const params = new URLSearchParams(location.search);
  const [searchParams, setSearchParams] = useSearchParams();

  const [products, setProducts] = useState([]);
  const [types, setTypes] = useState([]);
  const [searchObj, setSearchObj] = useState({
    query: params.get("q") ? params.get("q") : "",
    type: params.get("type") ? params.get("type") : "",
    min: params.get("min") ? params.get("min") : 0,
    max: params.get("max") ? params.get("max") : 0,
  });
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

  // ENSURE SEARCH QUERIES STAY IN URL
  useEffect(() => {
    if (location.pathname == "/products") {
      params.set("q", searchObj.query);
      params.set("type", searchObj.type);
      params.set("min", searchObj.min);
      params.set("max", searchObj.max);
      setSearchParams(params);
    }
  }, [location.pathname]);

  // FILTER POSTS
  useEffect(() => {
    setFilterProducts(products);
    console.log(products);
    console.log(filterProducts);

    // --- Proof of concept ---
    const searchFilter = [];
    // lowercase the query
    const searchQuery = searchObj.query.toLowerCase();
    // lowercase function
    function tLC(objProp) {
      return objProp.toLowerCase();
    }

    products.forEach((product) => {
      if (
        product.typeName.includes(searchObj.type) &&
        product.price > searchObj.min &&
        (tLC(product.name).includes(searchQuery) ||
          tLC(product.description).includes(searchQuery) ||
          tLC(product.typeName).includes(searchQuery))
      ) {
        searchFilter.push(product);
      }
    });
    setFilterProducts(searchFilter);
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
        filterProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
