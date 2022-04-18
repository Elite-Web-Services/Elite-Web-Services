import React, { useState } from 'react';
import LoginBtn from './LoginBtn';
import Login from './Login';

const Navbar = () => {
  const [isLogin, setIsLogin] = useState(false); // change this to modal
  return (
    <div>
      <LoginBtn setIsLogin={setIsLogin} isLogin={isLogin} />
      {isLogin ? <Login /> : null}
    </div>
  );
};

export default Navbar;
