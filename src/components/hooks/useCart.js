import { useContext } from 'react';
import { CartContext } from '../context/CartContext';

const useCart = () => {
  const { cart, setCart, addProduct, removeProduct } = useContext(CartContext);

  return { cart, setCart, addProduct, removeProduct };
};

export default useCart;
