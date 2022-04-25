import { useContext } from 'react';
import { CartContext } from '../context/CartContext';

const useCart = () => {
  const { cart, setCart, addProductToCart } = useContext(CartContext);

  return { cart, setCart, addProductToCart };
};

export default useCart;
