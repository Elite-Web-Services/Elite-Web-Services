import React from 'react';
import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import useCart from '../hooks/useCart';
import { toast } from 'react-toastify';

const LoginBtn = ({ setIsLogin }) => {
  const navigate = useNavigate();
  const { user, setToken } = useAuth();
  const { setCart } = useCart();

  const logOutToast = (e) => {
    toast.info('Logged Out', { theme: 'colored' });
  };

  const logIn = () => {
    setIsLogin(true);
  };

  const logOut = () => {
    localStorage.removeItem('token');
    setToken('');
    setCart({});
    navigate('/');
    logOutToast();
  };

  const handleLogIn = () => {
    if (user.username) {
      logOut();
    } else {
      logIn();
    }
  };

  return (
    <div id="loginLogoutLink" className="nav-link" onClick={handleLogIn}>
      {user.username ? 'Logout' : 'Login'}
    </div>
  );
};

export default LoginBtn;
