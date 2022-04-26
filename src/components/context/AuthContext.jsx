import React, { useState, useEffect } from 'react';
import {
  getMe,
  getAllUsers,
} from '../../axios-services';

export const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [allUsers, setAllUsers] = useState([]);
  const [token, setToken] = useState(localStorage.getItem('token'));

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

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        token,
        setToken,
        allUsers,
        setAllUsers,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
