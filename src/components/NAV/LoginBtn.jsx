import React from 'react';
import useAuth from '../hooks/useAuth';

const LoginBtn = ({ setIsLogin }) => {
  const { user, setToken, setCart } = useAuth();

  const logIn = () => {
    setIsLogin(true);
  };

  const logOut = () => {
    localStorage.removeItem('token');
    setToken('');
    setCart({});
  };

  const handleLogIn = () => {
    if (user.username) {
      logOut();
    } else {
      logIn();
    }
  };

  return (
    <a id="loginLogoutLink" className="nav-link" onClick={handleLogIn}>
      {user.username ? 'Logout' : 'Login'}
    </a>
  );
};

export default LoginBtn;
