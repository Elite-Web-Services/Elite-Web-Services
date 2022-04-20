import React, { useEffect } from 'react';
import { loginUser } from '../../axios-services/';
import useAuth from '../hooks/useAuth';

const LoginForm = ({
  setIsLogin,
  username,
  setUsername,
  password,
  setPassword,
  setIsError,
  setErrorMessage,
}) => {
  const { user, setToken } = useAuth();

  useEffect(() => {
    setIsError(false);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(username, password);
      setIsError(false);
      console.log('LOGINUSER RESPONSE: ', response);
      localStorage.setItem('token', response.token);
      setToken(response.token);
      setIsLogin(false);
    } catch (error) {
      setIsError(true);
      setErrorMessage(error.message);
    }
  };

  return (
    <form>
      <label htmlFor="username">Username: </label>
      <input
        type="text"
        name="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <label htmlFor="password">Password: </label>
      <input
        type="password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={(e) => handleSubmit(e)}>Submit</button>
    </form>
  );
};

export default LoginForm;
