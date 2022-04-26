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
    products.forEach((product) => {
      if (
        product.typeName.includes(searchObj.type) &&
        product.name.includes(searchObj.query)
      ) {
        searchFilter.push(product);
      }
    });
    setFilterProducts(searchFilter);
    // --- Proof of concept ---

    // if (searchObj.type) {
    //   setFilterProducts(
    //     products.filter((product) => product.typeName === searchObj.type)
    //   );
    // }

    // if (searchObj.query) {
    //   setFilterProducts(
    //     filterProducts.filter((product) => product.name.includes(searchObj.query))
    //   );
    // }
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