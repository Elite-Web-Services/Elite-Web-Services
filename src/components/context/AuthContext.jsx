import React, { useState, useEffect } from 'react';
import { getPublicProducts, getMe, getAllUsers, getCart, getAllTypes } from '../../axios-services';

export const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [allUsers, setAllUsers] = useState([]);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [publicProducts, setPublicProducts] = useState([]);
  const [cart, setCart] = useState({})
  const [types, setTypes] = useState([]);

  // GET PUBLIC PRODUCTS
  useEffect(() => {
    const displayPublicProducts = async () => {
      const data = await getPublicProducts();
      setPublicProducts(data);
    };
    displayPublicProducts();
  }, []);

  // SET USER
  const getAllTheUsers = async () => {
    const users = await getAllUsers(token);
    console.log('GOT USERS: ', users);
    setAllUsers(users);
    console.log('ALL USERS: ', allUsers);
  };

  const getUser = async () => {
    if (localStorage.getItem('token')) {
      const user = await getMe(token);
      setUser(user);
      console.log('ME THE USER: ', user);

      const cart = await getCart(token) 
      setCart(cart)

      if (user.isAdmin) {
        getAllTheUsers();
      }
    } else {
      setUser({});
      setAllUsers([]);
    }
  };

  useEffect(() => {
    getUser();
  }, [token]);

  useEffect(() => {
    const displayAllTypes = async () => {
      const data = await getAllTypes();
      setTypes(data);
    };
    displayAllTypes();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        token,
        setToken,
        publicProducts,
        setPublicProducts,
        allUsers,
        setAllUsers,
        cart,
        setCart,
        types,
        setTypes
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
