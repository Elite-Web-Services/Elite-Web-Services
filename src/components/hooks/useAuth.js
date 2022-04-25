import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const useAuth = () => {
  const {
    user,
    setUser,
    token,
    setToken,
    products,
    setProducts,
    allUsers,
    setAllUsers,
    cart,
    setCart,
    types,
    setTypes,
  } = useContext(AuthContext);

  return {
    user,
    setUser,
    token,
    setToken,
    products,
    setProducts,
    allUsers,
    setAllUsers,
    cart,
    setCart,
    types,
    setTypes,
  };
};

export default useAuth;
