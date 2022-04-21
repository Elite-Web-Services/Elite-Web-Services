import React from "react";
import { Routes, Route } from "react-router-dom";
import Products from "./Products";
import AllUsers from "./AllUsers";
import Cart from "../SIDEBAR/Cart";
import ProfileContactInfo from "../SIDEBAR/ProfileContactInfo";
import ProfileOrderHistory from "../SIDEBAR/ProfileOrderHistory";

const Main = () => {
  return (
    <div className="main">
      <Routes>
        <Route path="/users/" element={<AllUsers />} />
        <Route path="/contactinfo" element={<ProfileContactInfo />} />
        <Route path="/orderHistory" element={<ProfileOrderHistory />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/" element={<Products />} />
      </Routes>
    </div>
  );
};

export default Main;
