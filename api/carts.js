const cartsRouter = require('express').Router();
const { Cart, CartProduct } = require('../db/models/');
const { requireUser } = require('./utils');

cartsRouter.get('/', requireUser, async (req, res, next) => {
  console.log('a request to get carts is made');
  try {
    const [cart] = await Cart.getCart(req.user.id);
    res.send(cart);

    // come back to catch errors
  } catch (error) {
    throw error;
  }
});

cartsRouter.post('/addProduct', requireUser, async (req, res, next) => {
  const { cartId, productId, quantity, purchasedCost } = req.body;
  try {
    const response = await CartProduct.addProductToCart({
      cartId,
      productId,
      quantity,
      purchasedCost,
    });

    const [cart] = await Cart.getCart(req.user.id);

    res.send(cart);
    // come back to catch errors
  } catch (error) {
    throw error;
  }
});

cartsRouter.patch('/productQuantity', requireUser, async (req, res, next) => {
  const { quantity, cartId, productId } = req.body;
  try {
    const response = await CartProduct.increaseCartProductQuantity({
      quantity,
      cartId,
      productId,
    });

    const [cart] = await Cart.getCart(req.user.id);

    res.send(cart);
  } catch (error) {
    throw error;
  }
});

cartsRouter.delete(
  '/removeCartProduct',
  requireUser,
  async (req, res, next) => {
    console.log('attempting to delete cart product', req.body);
    const { productId } = req.body;
    try {
      const response = await CartProduct.deleteCartItem(productId);

      const [cart] = await Cart.getCart(req.user.id);

      res.send(cart);
      // come back to catch errors
    } catch (error) {
      throw error;
    }
  }
);

cartsRouter.patch('/purchaseCart', requireUser, async (req, res, next) => {
  console.log('a cart was just purchased');
  const { cartId } = req.body;
  try {
    const updatedCart = await Cart.purchaseCart(cartId);
    if (updatedCart.id) {
      const [newCart] = await Cart.createCart({
        userId: req.user.id,
        purchased: false,
      });
      res.send(newCart);
    } else {
      res.status(404);
      next({
        name: 'PurchaseCartError',
        message: 'Something went wrong. Please try again.',
      });
    }
  } catch (error) {
    throw error;
  }
});

module.exports = cartsRouter;
