import { useContext } from 'react';
import { CartContext } from '../context/CartContext';

const useCart = () => {
  const { cart, setCart, total, addProduct, removeProduct } =
    useContext(CartContext);

  return { cart, setCart, total, addProduct, removeProduct };
};

export default useCart;
