import React, { useState } from "react";
import useAuth from "../hooks/useAuth";
import useCart from "../hooks/useCart";
import { Link } from "react-router-dom";
import { decrementQuantity, incrementQuantity } from "../context/helpers";

const Sidebar = () => {
  const { user, token } = useAuth();
  const { cart, setCart } = useCart();
  const [toggleAdminRender, setToggleAdminRender] = useState(false);
  const [toggleCartRender, setToggleCartRender] = useState(false);
  const [toggleProfileOH, setToggleProfileOH] = useState(false);
  const [toggleProfileContact, setToggleProfileContact] = useState(false);
  const [toggleCart, setToggleCart] = useState(false);
  const [toggleCheckout, setToggleCheckout] = useState(false);

  const handleIncrementClick = async (product) => {
    const newCart = await incrementQuantity(cart, product.id, 1, user, token);
    setCart(newCart);
  };
  const handleDecrementClick = async (product) => {
    const newCart = await decrementQuantity(cart, product.id, 1, user, token);
    setCart(newCart);
  };

  const handleAdmin = () => {
    setToggleAdminRender(true);
    setToggleCartRender(false);
  };

  const handleCart = () => {
    setToggleAdminRender(false);
    setToggleCartRender(true);
  };

  return (
    <div className="sideBarContainer">
      <div className="d-flex flex-column p-3 bg-white">
        <ul className="list-unstyled ps-0">
          {/* --------------------------------------------MY PROFILE */}

          {user.isAdmin ? (
            <li className="mb-1">
              <button
                className="btn btn-toggle align-items-center rounded collapsed"
                data-bs-toggle="collapse"
                data-bs-target="#admin-sidebar-collapse"
                aria-expanded="false"
                onClick={handleAdmin}
              >
                ADMIN Controls
              </button>
              <div className="collapse" id="admin-sidebar-collapse">
                <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                  <li>
                    <Link to="/users" style={{ textDecoration: "none" }}>
                      Manage Users{" "}
                    </Link>
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

          {/* ----------------------------------------ADMIN */}
          {user.username ? (
            <li className="mb-1">
              <button
                className="btn btn-toggle align-items-center rounded collapsed"
                data-bs-toggle="collapse"
                data-bs-target="#profile-collapse"
                aria-expanded="false"
              >
                My Profile
              </button>
              <div className="collapse" id="profile-collapse">
                <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                  <li>
                    <Link
                      to="/orderHistory"
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
          ) : (
            <h3>GUEST ACCESS</h3>
          )}
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
                    to="/checkout"
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
        <div className="col-md-5 col-lg-4 order-md-last">
          <h4 className="d-flex justify-content-between align-items-center mb-3">
            <span className="text-primary">Your cart</span>
            <span className="badge bg-primary rounded-pill">
              {cart.products ? cart.products.length : "0"}
            </span>
          </h4>
          <ul className="list-group mb-3">
            {cart.products
              ? cart.products.map((product, i) => {
                  return (
                    <li
                      className="list-group-item d-flex justify-content-between lh-sm"
                      key={`checkoutcartproduct:${i}`}
                    >
                      <div>
                        <h6 className="my-0">{product.name}</h6>

                        <p>
                          <strong>Quantity: {product.quantity}</strong>
                        </p>
                        <button onClick={() => handleIncrementClick(product)}>
                          +
                        </button>
                        <button onClick={() => handleDecrementClick(product)}>
                          -
                        </button>
                      </div>
                    </li>
                  );
                })
              : null}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
