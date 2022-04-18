import React from 'react';

const LoginForm = () => {
  return (
    <form>
      <label htmlFor="username">Username: </label>
      <input type="text" name="username" />
      <label htmlFor="password">Password: </label>
      <input type="password" name="password" />
      <button>Submit</button>
    </form>
  );
};

export default LoginForm;
