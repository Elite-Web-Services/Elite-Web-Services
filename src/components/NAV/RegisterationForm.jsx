import React, { useEffect } from 'react';
import { registerUser } from '../../axios-services';
// import { useNavigate } from "react-router-dom";
import useAuth from '../hooks/useAuth';

const RegisterationForm = ({
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

  const handleRegistration = async (e) => {
    e.preventDefault();
    try {
      const response = await registerUser(username, password);
      setIsError(false);
      console.log('REGISTER USER RESPONSE: ', response);
      localStorage.setItem('token', response.token);
      setToken(response.token);
      setIsLogin(false);
    } catch (error) {
      setIsError(true);
      setErrorMessage(error.message);
    }
  };

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div id="registration_container">
      <form onSubmit={handleRegistration}>
        <label htmlFor="username">Username: </label>
        <input
          type="text"
          value={username}
          onChange={handleUsername}
          required
        ></input>
        <label htmlFor="password">Password: </label>
        <input
          type="text"
          value={password}
          onChange={handlePassword}
          required
          minLength={8}
        ></input>
        <button type="submit">Register</button>
        {/* <button to="login" onClick={navToLogin}>
          Already a member?
        </button> */}
      </form>
    </div>
  );
};

export default RegisterationForm;
