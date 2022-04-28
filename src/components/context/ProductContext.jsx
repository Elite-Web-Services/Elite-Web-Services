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
    min: 0,
    max: 0,
    isPublic: "",
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [price, setPrice] = useState({
    min: "",
    max: "",
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
  }, [user]);

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
      setSearchParams(params);
    }
  }, [location.pathname]);

  // FILTER POSTS
  useEffect(() => {
    setFilterProducts(products);

    const searchFilter = [];
    if (products.length) {
      // lowercase the query
      const searchQuery = searchObj.query.toLowerCase();
      // lowercase function
      function tLC(objProp) {
        return objProp.toLowerCase();
      }

      products.forEach((product) => {
        if (
          product.typeName.includes(searchObj.type) &&
          Number(product.price) >= Number(searchObj.min) &&
          (searchObj.max == 0
            ? true
            : Number(product.price) <= Number(searchObj.max)) &&
          // (!searchObj.isPublic.length
          //   ? true
          //   : searchObj.isPublic == product.isPublic) &&
          (tLC(product.name).includes(searchQuery) ||
            tLC(product.description).includes(searchQuery) ||
            tLC(product.typeName).includes(searchQuery))
        ) {
          searchFilter.push(product);
        }
      });
      setFilterProducts(searchFilter);
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
        filterProducts,
        searchTerm,
        setSearchTerm,
        price,
        setPrice,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
