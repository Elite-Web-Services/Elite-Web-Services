import { user } from 'pg/lib/defaults';
import React, { useState } from 'react';

export const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  // const [token, setToken] = useState(localStorage.get('token'));

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
