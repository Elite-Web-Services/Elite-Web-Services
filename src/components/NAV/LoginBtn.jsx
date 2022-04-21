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
    setCart({})
  };
  return (
    <div>
      {user.username ? (
        <button onClick={logOut}>Log Out</button>
      ) : (
        <button onClick={logIn}>Log In</button>
      )}
    </div>
  );
};

export default LoginBtn;
