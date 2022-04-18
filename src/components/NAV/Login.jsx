import React, { useState } from 'react';
import useAuth from '../hooks/useAuth';
import LoginForm from './LoginForm';
import RegistrationForm from './RegistrationForm';

// rename this to Login? embed LoginForm and RegisterForm components
const Login = () => {
  const [isRegister, setIsRegister] = useState(false);

  return (
    <div>
      <p>
        Don't have an account?{' '}
        <div
          onClick={() => {
            setIsRegister(!isRegister);
          }}
        >
          <RegistrationForm />
        </div>
      </p>
      {isRegister ? <p>register form goes here</p> : <LoginForm />}
    </div>
  );
};

export default Login;
