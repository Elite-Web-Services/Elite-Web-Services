import React, { useState } from 'react';
import LoginBtn from './LoginBtn';
import Login from './Login';
import useAuth from '../hooks/useAuth';
import AllUsersBtn from './AllUsersBtn';
import ProductsBtn from './ProductsBtn';

const Navbar = () => {
  const { user, token } = useAuth();
  const [isLogin, setIsLogin] = useState(false); // change this to modal
  return (
    <header className="navbar p-3 bg-dark text-white">
      <div className="container">
        <div className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
          <p>{user.username ? `Hello, ${user.username}` : `Hello, guest`}</p>
          <LoginBtn setIsLogin={setIsLogin} isLogin={isLogin} />
          {isLogin && <Login isLogin={isLogin} setIsLogin={setIsLogin} />}
          {user.isAdmin ? <AllUsersBtn /> : null}
          <ProductsBtn />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
