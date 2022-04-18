import React from 'react';
import useAuth from '../hooks/useAuth';

const LoginBtn = ({ isLogin, setIsLogin }) => {
  const { user } = useAuth();
  return (
    <div>
      <button onClick={() => setIsLogin(!isLogin)}>
        {user ? 'Log in' : `Logout`}
      </button>
    </div>
  );
};

export default LoginBtn;
