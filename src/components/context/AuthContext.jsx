import React, { useState, useEffect } from 'react';
import { getPublicProducts, getMe, getAllUsers } from '../../axios-services';

export const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [allUsers, setAllUsers] = useState([]);
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

      // change to if (user.isAdmin)
      if (user.username) {
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
