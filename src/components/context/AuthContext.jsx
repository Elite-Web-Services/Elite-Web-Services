import React, { useState } from 'react';

export const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({ username: 'Johnny' });
  const [token, setToken] = useState(localStorage.getItem('token'));

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
