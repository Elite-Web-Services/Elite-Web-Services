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
    cart,
    setCart,
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
    cart,
    setCart,
  };
};

export default useAuth;
