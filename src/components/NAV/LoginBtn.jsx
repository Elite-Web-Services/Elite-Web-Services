import React from 'react';
import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import useCart from '../hooks/useCart';

const LoginBtn = ({ setIsLogin }) => {
  const navigate = useNavigate();
  const { user, setToken } = useAuth();
  const { setCart } = useCart();

  const logIn = () => {
    setIsLogin(true);
  };

  const logOut = () => {
    localStorage.removeItem('token');
    setToken('');
    setCart({});
    navigate('/');
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
