import React, { useState } from 'react';
import LoginForm from './LoginForm';
import RegisterationForm from './RegisterationForm';
import { Modal } from 'react-bootstrap';

// rename this to Login? embed LoginForm and RegisterForm components
const Login = ({ isLogin, setIsLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleClose = () => setIsLogin(false);

  return (
    <Modal show={isLogin} onHide={handleClose}>
      {isRegister ? (
        <RegisterationForm
          setIsLogin={setIsLogin}
          setIsRegister={setIsRegister}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          isError={isError}
          setIsError={setIsError}
          errorMessage={errorMessage}
          setErrorMessage={setErrorMessage}
        />
      ) : (
        <LoginForm
          setIsLogin={setIsLogin}
          setIsRegister={setIsRegister}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          isError={isError}
          setIsError={setIsError}
          errorMessage={errorMessage}
          setErrorMessage={setErrorMessage}
        />
      )}
    </Modal>
  );
};

export default Login;
