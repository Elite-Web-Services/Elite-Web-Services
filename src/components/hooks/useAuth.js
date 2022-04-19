import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const useAuth = () => {
  const { user, setUser, token, setToken, publicProducts, setPublicProducts } = useContext(AuthContext);

  return { user, setUser, token, setToken, publicProducts, setPublicProducts };
};

export default useAuth;
