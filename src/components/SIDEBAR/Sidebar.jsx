import React, { useState } from "react";
import useAuth from "../hooks/useAuth";
import Admin from "./Admin";
import Cart from "./Cart";
import Profile from "./Profile";
import ProfileOrderHistory from "./ProfileOrderHistory";
import ProfileContactInfo from "./ProfileContactInfo";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const { user } = useAuth();
  const [toggleAdminRender, setToggleAdminRender] = useState(false);
  const [toggleCartRender, setToggleCartRender] = useState(false);
  const [toggleProfileOH, setToggleProfileOH] = useState(false);
  const [toggleProfileContact, setToggleProfileContact] = useState(false);
  const [toggleCart, setToggleCart] = useState(false);
  const [toggleCheckout, setToggleCheckout] = useState(false);

  const handleAdmin = () => {
    setToggleAdminRender(true);
    setToggleCartRender(false);
    // setToggleProfileRender(false);
  };

  const handleCart = () => {
    setToggleAdminRender(false);
    setToggleCartRender(true);
    // setToggleProfileRender(false);
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
              // onClick={handleProfile}
            >
              My Profile
            </button>
            <div className="collapse" id="profile-collapse">
              <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                <li>
                  <Link
                    to="/#"
                    onClick={() => {
                      setToggleProfileOH(true);
                    }}
                    style={{ textDecoration: "none" }}
                  >
                    Order History{" "}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contactinfo"
                    onClick={() => {
                      setToggleProfileContact(true);
                    }}
                    style={{ textDecoration: "none" }}
                  >
                    Contact Information{" "}
                  </Link>
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
                    <Link
                      to="/"
                      onClick={() => {
                        setToggleCheckout(true);
                      }}
                      style={{ textDecoration: "none" }}
                    >
                      Manage Products{" "}
                    </Link>
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
                  <Link
                    to="/cart"
                    onClick={() => {
                      setToggleCheckout(true);
                    }}
                    style={{ textDecoration: "none" }}
                  >
                    Checkout{" "}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/cart"
                    onClick={() => {
                      setToggleCart(true);
                    }}
                    style={{ textDecoration: "none" }}
                  >
                    Go to Cart{" "}
                  </Link>
                </li>
              </ul>
            </div>
          </li>
        </ul>
        {/* -------------------------------------RENDER MENU */}
        <div className="side-bar-render-box">
          {user.isAdmin && toggleAdminRender ? <Admin /> : null}
          {toggleProfileOH ? <ProfileOrderHistory /> : null}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
