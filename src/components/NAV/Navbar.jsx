import React, { useState } from 'react';
import LoginBtn from './LoginBtn';
import Login from './Login';
import useAuth from '../hooks/useAuth';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import useCart from '../hooks/useCart';

const Navbar = () => {
  const { user } = useAuth();
  const { cart } = useCart();
  const [isLogin, setIsLogin] = useState(false); // change this to modal
  return (
    <nav className="navbar p-0 navbar-expand-md navbar-dark bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand">
          <img
            src="https://res.cloudinary.com/elite-web-services/image/upload/v1651153876/Untitled_Artwork_1_qa34ja.png"
            width="65px"
          />
        </a>
        <button
          className="navbar-toggler collapsed"
          data-bs-toggle="collapse"
          data-bs-target="#navLinksExpanded"
          aria-controls="navLinksExpanded"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="navbar-collapse collapse" id="navLinksExpanded">
          <ul className="navbar-nav me-auto mb-2 mb-md-0">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <LoginBtn setIsLogin={setIsLogin} isLogin={isLogin} />
            </li>
            {user.isAdmin ? (
              <li className="nav-item">
                <Link to="/users" className="nav-link">
                  Users
                </Link>
              </li>
            ) : null}
            <li className="nav-item">
              <Link to="/products" className="nav-link">
                Products
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/cart" className="nav-link">
                <span className="badge bg-success rounded-pill">
                  {cart.products ? cart.products.length : '0'}
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="bi bi-cart"
                  viewBox="0 0 16 16"
                >
                  <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"></path>
                </svg>
                Cart
              </Link>
            </li>
          </ul>
          <SearchBar />
        </div>

        {isLogin && <Login isLogin={isLogin} setIsLogin={setIsLogin} />}
      </div>
    </nav>
  );
};

export default Navbar;
