import React, { useState, useEffect } from 'react';
import { addProductToCart, getCart } from '../../axios-services';
import useAuth from '../hooks/useAuth';

export const CartContext = React.createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({});
  const { user, token } = useAuth();

  const addProduct = async (product) => {
    if (user.username) {
      if (productExistsInCart) {
        // update quantity
      }
      const newCart = await addProductToCart(token, cart.cartId, product.id, 1);
      setCart(newCart);
      return;
    }

    if (localStorage.getItem('cart')) {
      console.log('THE PRODUCT: ', product);
      let cart = await JSON.parse(localStorage.getItem('cart'));
      cart.products.push({
        productId: product.id,
        productName: product.name,
        productDescription: product.description,
        price: product.price,
        imgURL: product.imgURL,
        isPublic: product.isPublic,
        quantity: 1,
      });
      localStorage.setItem('cart', JSON.stringify(cart));
      console.log('cart');
      setCart(cart);
      return;
    } else {
      console.log('THE PRODUCT: ', product);
      let cart = {
        products: [
          {
            productId: product.id,
            productName: product.name,
            productDescription: product.description,
            price: product.price,
            imgURL: product.imgURL,
            isPublic: product.isPublic,
            quantity: 1,
          },
        ],
        purchased: false,
      };
      localStorage.setItem('cart', JSON.stringify(cart));
    }
    setCart(cart);
  };

  const updateCartState = async () => {
    if (localStorage.getItem('token')) {
      const cart = await getCart(token);
      console.log('Got the cart from cartcontext: ', cart);
      setCart(cart);
    } else if (localStorage.getItem('cart')) {
      setCart(JSON.parse(localStorage.getItem('cart')));
    }
  };

  // get cart
  useEffect(() => {
    updateCartState();
  }, [token]);

  return (
    <CartContext.Provider value={{ cart, setCart, addProduct }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
