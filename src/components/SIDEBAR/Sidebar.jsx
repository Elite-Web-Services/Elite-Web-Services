import React from "react";
import useAuth from "../hooks/useAuth";

const Sidebar = () => {
  const { user } = useAuth();
  return (
    <div id="sidebar_container">
      <div>
        <p>`Welcome, ${user.username}</p>
      </div>
      <div className="profile_inside_sidebar">
        <button type="submit" className="profile_sidebar_button">
          My Profile
        </button>
      </div>
      <div className="cart_inside_sidebar">
        <button type="submit" className="cart_sidebar_button">
          Cart
        </button>
      </div>
      <div className="cart_products_list"></div>
    </div>
  );
};

export default Sidebar;
