import React, { useState } from "react";
import useAuth from "../hooks/useAuth";
import Admin from "./Admin";
import Cart from "./Cart";
import Profile from "./Profile";

const Sidebar = () => {
  const { user } = useAuth();
  const [toggleAdminRender, setToggleAdminRender] = useState(false);
  const [toggleCartRender, setToggleCartRender] = useState(false);
  const [toggleProfileRender, setToggleProfileRender] = useState(false);

  const handleAdmin = () => {
    setToggleAdminRender(true);
    setToggleCartRender(false);
    setToggleProfileRender(false);
  };

  const handleCart = () => {
    setToggleAdminRender(false);
    setToggleCartRender(true);
    setToggleProfileRender(false);
  };
  const handleProfile = () => {
    setToggleAdminRender(false);
    setToggleCartRender(false);
    setToggleProfileRender(true);
  };

  return (
    <div id="sidebar_container">
      <div className=" flex-shrink-0 p-3 bg-white" style={{ width: "280px" }}>
        <ul className="list-unstyled ps-0">
          {/* --------------------------------------------MY PROFILE */}

          <li className="mb-1">
            <button
              className="btn btn-toggle align-items-center rounded collapsed"
              data-bs-toggle="collapse"
              data-bs-target="#profile-collapse"
              aria-expanded="false"
              onClick={handleProfile}
            >
              My Profile
            </button>
            <div className="collapse" id="profile-collapse">
              <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                <li>
                  <a href="#" className="link-dark rounded">
                    Order History
                  </a>
                </li>
                <li>
                  <a href="#" className="link-dark rounded">
                    Contact Info
                  </a>
                </li>
                <li>
                  <a href="#" className="link-dark rounded">
                    Customize Profile
                  </a>
                </li>
              </ul>
            </div>
          </li>
          {/* ----------------------------------------ADMIN */}
          {user.isAdmin ? (
            <li className="mb-1">
              <button
                className="btn btn-toggle align-items-center rounded collapsed"
                data-bs-toggle="collapse"
                data-bs-target="#cart-sidebar-collapse"
                aria-expanded="false"
                onClick={handleAdmin}
              >
                ADMIN Controls
              </button>
              <div className="collapse" id="cart-sidebar-collapse">
                <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                  <li>
                    <a href="#" className="link-dark rounded">
                      Manage Users
                    </a>
                  </li>
                  <li>
                    <a href="#" className="link-dark rounded">
                      Manage Products
                    </a>
                  </li>
                </ul>
              </div>
            </li>
          ) : null}
          {/* ----------------------------------------CART */}
          <li className="mb-1">
            <button
              className="btn btn-toggle align-items-center rounded collapsed"
              data-bs-toggle="collapse"
              data-bs-target="#cart-sidebar-collapse"
              aria-expanded="false"
              onClick={handleCart}
            >
              Cart
            </button>
            <div className="collapse" id="cart-sidebar-collapse">
              <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                <li>
                  <a href="#" className="link-dark rounded">
                    Checkout
                  </a>
                </li>
                <li>
                  <a href="#" className="link-dark rounded">
                    Go to Cart
                  </a>
                </li>
              </ul>
            </div>
          </li>
        </ul>

        <div className="side-bar-render-box">
          {user.isAdmin && toggleAdminRender ? <Admin /> : null}
          {toggleCartRender ? <Cart /> : null}
          {toggleProfileRender ? <Profile /> : null}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
