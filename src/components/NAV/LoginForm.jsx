import React from 'react';
import { loginUser } from '../../axios-services/';

const LoginForm = ({ username, setUsername, password, setPassword }) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(username, password);
      console.log('LOGINUSER RESPONSE: ', response);
    } catch (error) {
      throw error;
    }
    const response = await loginUser(username, password);
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
