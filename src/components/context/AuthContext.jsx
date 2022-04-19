import React, { useState, useEffect } from 'react';
import { getPublicProducts } from '../../axios-services';

export const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({ username: 'Johnny' });
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [publicProducts, setPublicProducts] = useState([]);

  useEffect(() => {
    const displayPublicProducts = async () => {
      const data = await getPublicProducts();
      setPublicProducts(data);
    };
    displayPublicProducts();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, publicProducts, setPublicProducts }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
