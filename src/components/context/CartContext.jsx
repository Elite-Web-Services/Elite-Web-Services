import React, { useState, useEffect } from 'react';
import {
  addProductToCart,
  deleteCartProduct,
  getCart,
} from '../../axios-services';
import useAuth from '../hooks/useAuth';
import { findCartProductIdx, incrementQuantity } from './helpers';

export const CartContext = React.createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({});
  const { user, token } = useAuth();

  const removeProduct = async (product) => {
    if (user.username) {
      const newCart = await deleteCartProduct(product.id, token);
      setCart(newCart);
      return;
    }

    if (localStorage.getItem('cart')) {
      let cart = await JSON.parse(localStorage.getItem('cart'));
      let newProducts = cart.products.filter(
        (item) => +item.id !== +product.id
      );
      cart.products = newProducts;
      localStorage.setItem('cart', JSON.stringify(cart));
      setCart(cart);
      return;
    }
  };

  const addProduct = async (product, addQuantity = 1) => {
    if (user.username) {
      // if product exists in cart, update the quantity
      if (findCartProductIdx(cart, product.id) > -1) {
        const newCart = await incrementQuantity(
          cart,
          product.id,
          addQuantity,
          user,
          token
        );
        // setCart(newCart);
        console.log('Context newCart: ', newCart);
        return newCart;
      }
      // else add new product
      const newCart = await addProductToCart(
        token,
        cart.cartId,
        product.id,
        addQuantity
      );
      // setCart(newCart);
      console.log('Context newCart: ', newCart);
      return newCart;
    }

    // WE ARE GUEST BUT HAVE A CART
    if (localStorage.getItem('cart')) {
      let cart = await JSON.parse(localStorage.getItem('cart'));
      // if product exists in cart, update the quantity
      if (findCartProductIdx(cart, product.id) > -1) {
        const newCart = await incrementQuantity(
          cart,
          product.id,
          addQuantity,
          user
        );
        localStorage.setItem('cart', JSON.stringify(newCart));
        // setCart(newCart);
        console.log('Context newCart: ', newCart);
        return newCart;
      }
      // else add new product
      cart.products.push({
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        imgURL: product.imgURL,
        isPublic: product.isPublic,
        quantity: 1,
      });
      localStorage.setItem('cart', JSON.stringify(cart));
      console.log('Context newCart: ', cart);
      // setCart(cart);
      return cart;
    }

    // WE ARE GUEST BUT DON'T HAVE A CART
    else {
      let newCart = {
        products: [
          {
            id: product.id,
            name: product.name,
            description: product.description,
            price: product.price,
            imgURL: product.imgURL,
            isPublic: product.isPublic,
            quantity: 1,
          },
        ],
        purchased: false,
      };
      localStorage.setItem('cart', JSON.stringify(newCart));
      // setCart(cart);
      console.log('Context newCart: ', newCart);
      return newCart;
    }
  };

  const updateCartState = async () => {
    if (localStorage.getItem('token')) {
      const cart = await getCart(token);
      console.log('Got the cart from db: ', cart);
      setCart(cart);
    } else if (localStorage.getItem('cart')) {
      const cart = JSON.parse(localStorage.getItem('cart'));
      setCart(cart);
      console.log('Got the cart from localstorage: ', cart);
    }
  };

  const mergeCarts = async () => {
    if (localStorage.getItem('cart') && localStorage.getItem('token')) {
      let storedCart = await JSON.parse(localStorage.getItem('cart'));
      await Promise.all(
        storedCart.products.map((product) =>
          addProduct(product, product.quantity)
        )
      );
      localStorage.removeItem('cart');
      const newCart = await getCart(token);
      console.log('new cart: ', newCart);
      setCart(newCart);
    }
  };

  // get cart
  useEffect(() => {
    updateCartState();
  }, [user]);

  // merge guest cart with logged in cart
  useEffect(() => {
    mergeCarts();
  }, [cart]);

  return (
    <CartContext.Provider value={{ cart, setCart, addProduct, removeProduct }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
