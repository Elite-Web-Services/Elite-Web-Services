const cartsRouter = require('express').Router();
const { Cart } = require('../db/models/');

cartsRouter.use('/', async (req, res, next) => {
  console.log('a request to get carts is made');
  console.log('hardcoded response for user 2');
  try {
    const cart = await Cart.getCart(2);
    res.send(cart);

    // come back to catch errors
  } catch (error) {
    throw error;
  }
});

module.exports = cartsRouter;
