import React from 'react';

const LoginForm = ({ username, setUsername, password, setPassword }) => {
  const handleSubmit = async () => {
    alert('LOGGED IN');
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
      <button onClick={() => handleSubmit}>Submit</button>
    </form>
  );
};

export default LoginForm;
