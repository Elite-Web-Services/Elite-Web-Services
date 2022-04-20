import React, { useState } from 'react';
import LoginBtn from './LoginBtn';
import Login from './Login';
import useAuth from '../hooks/useAuth';

const Navbar = () => {
  const { user, token } = useAuth();
  const [isLogin, setIsLogin] = useState(false); // change this to modal
  return (
    <header className="navbar p-3 bg-dark text-white">
      <div className="container">
        <p>{user.username ? `Hello, ${user.username}` : `Hello, guest`}</p>
        <LoginBtn setIsLogin={setIsLogin} isLogin={isLogin} />
        {isLogin && <Login isLogin={isLogin} setIsLogin={setIsLogin} />}
      </div>
    </header>
  );
};

export default Navbar;
