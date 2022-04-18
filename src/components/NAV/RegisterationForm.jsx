import React from 'react';
import { registerUser } from '../../axios-services';
// import { useNavigate } from "react-router-dom";
import useAuth from '../hooks/useAuth';

const RegisterationForm = ({
  username,
  setUsername,
  password,
  setPassword,
}) => {
  const { user } = useAuth();
  // let navigate = useNavigate();

  const handleRegistration = async (e) => {
    e.preventDefault();

    const response = await registerUser(username, password);
    localStorage.setItem('token', response.token);
    localStorage.setitem('username', username);
    const userToken = localStorage.getItem('token');
    // setToken(userToken);
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
        <input
          type="text"
          placeholder="username"
          onChange={handleUsername}
          required
        ></input>
        <input
          type="text"
          placeholder="password"
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
