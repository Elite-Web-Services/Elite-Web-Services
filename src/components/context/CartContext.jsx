import React, { useState, useEffect } from 'react';
import { getCart } from '../../axios-services';
import useAuth from '../hooks/useAuth';

export const CartContext = React.createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({});
  const { user, token } = useAuth();

  const addProductToCart = async (product) => {
    if (user.username) {
      // fetch call
      return;
    }

    if (localStorage.getItem('cart')) {
      let cart = localStorage.getItem('cart');
      cart.products.push(product);
      localStorage.setItem('cart', cart);
      setCart(cart);
      return;
    } else {
      let cart = {
        products: [
          {
            imgUrl: product.imgURL,
            isPublic: product.isPublic,
            price: product.price,
            productDescription: product.productDescription,
            productId: product.productId,
            productName: product.productName,
            quantity: product.quantity,
          },
        ],
        purchased: false,
      };
      localStorage.setItem('cart', cart);
    }
  };

  const updateCartState = async () => {
    if (localStorage.getItem('token')) {
      const cart = await getCart(token);
      console.log('Got the cart from cartcontext: ', cart);
      setCart(cart);
    } else if (localStorage.getItem('cart')) {
      setCart(localStorage.getItem('cart'));
    }
  };

  // get cart
  useEffect(() => {
    updateCartState();
  }, [token]);

  return (
    <CartContext.Provider value={{ cart, setCart, addProductToCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
