import React, { useState } from 'react';
import useAuth from '../hooks/useAuth';
import Admin from './Admin';
import ProfileOrderHistory from './ProfileOrderHistory';

import { Link } from 'react-router-dom';

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
    <div className="sideBarContainer">
      <div className="d-flex flex-column p-3 bg-white">
        <ul className="list-unstyled ps-0">
          {/* --------------------------------------------MY PROFILE */}

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
                    style={{ textDecoration: 'none' }}
                  >
                    Order History{' '}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contactinfo"
                    onClick={() => {
                      setToggleProfileContact(true);
                    }}
                    style={{ textDecoration: 'none' }}
                  >
                    Contact Information{' '}
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
                    <Link
                      to="/users"
                      onClick={() => {
                        setToggleCheckout(true);
                      }}
                      style={{ textDecoration: 'none' }}
                    >
                      Manage Users{' '}
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/"
                      onClick={() => {
                        setToggleCheckout(true);
                      }}
                      style={{ textDecoration: 'none' }}
                    >
                      Manage Products{' '}
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
                    style={{ textDecoration: 'none' }}
                  >
                    Checkout{' '}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/cart"
                    onClick={() => {
                      setToggleCart(true);
                    }}
                    style={{ textDecoration: 'none' }}
                  >
                    Go to Cart{' '}
                  </Link>
                </li>
              </ul>
            </div>
          </li>
        </ul>
        {/* -------------------------------------RENDER MENU */}
        <div className="side-bar-render-box">
          {user.isAdmin && toggleAdminRender ? <Admin /> : null}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
