import { useContext } from "react";
import { ProductContext } from "../context/ProductContext";

const useProduct = () => {
  const {         products,
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
    setPrice
 } = useContext(ProductContext);

  return {
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
    setPrice
  };
};

export default useProduct;
