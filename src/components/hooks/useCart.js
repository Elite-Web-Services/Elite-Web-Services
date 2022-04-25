import { useContext } from 'react';
import { CartContext } from '../context/CartContext';

const useCart = () => {
  const { cart, setCart, addProduct } = useContext(CartContext);

  return { cart, setCart, addProduct };
};

export default useCart;
