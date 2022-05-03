import React, { useState, useEffect } from 'react';
import { getMe, getAllUsers } from '../../axios-services';

export const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [allUsers, setAllUsers] = useState([]);
  const [token, setToken] = useState(localStorage.getItem('token'));

  // SET USER
  const getAllTheUsers = async () => {
    const users = await getAllUsers(token);
    setAllUsers(users);
  };

  useEffect(() => {
    const getUser = async () => {
      if (localStorage.getItem('token')) {
        const user = await getMe(token);
        setUser(user);

        if (user.isAdmin) {
          getAllTheUsers();
        }
      } else {
        setUser({});
        setAllUsers([]);
      }
    };
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
