import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const useAuth = () => {
  const {
    user,
    setUser,
    token,
    setToken,
    publicProducts,
    setPublicProducts,
    allUsers,
    setAllUsers,
  } = useContext(AuthContext);

  return {
    user,
    setUser,
    token,
    setToken,
    publicProducts,
    setPublicProducts,
    allUsers,
    setAllUsers,
  };
};

export default useAuth;
