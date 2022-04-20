import React, { useState, useEffect } from 'react';
import { getPublicProducts, getMe } from '../../axios-services';

export const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [publicProducts, setPublicProducts] = useState([]);

  // GET PUBLIC PRODUCTS
  useEffect(() => {
    const displayPublicProducts = async () => {
      const data = await getPublicProducts();
      setPublicProducts(data);
    };
    displayPublicProducts();
  }, []);

  // SET USER
  const getUser = async () => {
    if (localStorage.getItem('token')) {
      const user = await getMe(token);
      setUser(user);
    } else {
      setUser({});
    }
  };
  useEffect(() => {
    getUser();
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        token,
        setToken,
        publicProducts,
        setPublicProducts,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
