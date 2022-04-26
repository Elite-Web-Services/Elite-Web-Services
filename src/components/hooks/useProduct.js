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
  };
};

export default useProduct;
