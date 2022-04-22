import React from "react";
import { Routes, Route } from "react-router-dom";
import Products from "./Products";
import AllUsers from "./AllUsers";
import Cart from "../SIDEBAR/Cart";
import EditProduct from "./EditProduct";
import ProfileContactInfo from "../SIDEBAR/ProfileContactInfo";
import useAuth from "../hooks/useAuth";

const Main = () => {
  const { publicProducts } = useAuth();

  return (
    <div className="main">
      <Routes>
        <Route path="/users/" element={<AllUsers />} />
        <Route path="/contactinfo" element={<ProfileContactInfo />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/products" element={<Products />} />
        {publicProducts ? (
          <>
            {publicProducts.map((product) => (
              <Route
                key={`productLink ${product.id}`}
                path={`products=${product.id}`}
                element={<EditProduct product={product} />}
              />
            ))}
          </>
        ) : null}
      </Routes>
    </div>
  );
};

export default Main;
