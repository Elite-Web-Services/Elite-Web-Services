import React, { useState } from 'react';
import LoginForm from './LoginForm';
import RegisterationForm from './RegisterationForm';
import { Modal } from 'react-bootstrap';

// rename this to Login? embed LoginForm and RegisterForm components
const Login = ({ isLogin, setIsLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);

  const handleClose = () => setIsLogin(false);

  return (
    <Modal show={isLogin} onHide={handleClose}>
      <p>
        Don't have an account?
        <span
          onClick={() => {
            setIsRegister(!isRegister);
          }}
        >
          {' Register instead'}
        </span>
      </p>
      {isRegister ? (
        <RegisterationForm
          username={username}
          setUserName={setUsername}
          password={password}
          setPassword={setPassword}
        />
      ) : (
        <LoginForm
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
        />
      )}
    </Modal>
  );
};

export default Login;
