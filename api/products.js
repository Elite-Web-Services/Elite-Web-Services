const productsRouter = require('express').Router();

productsRouter.use((req, res, next) => {
  console.log('A request is being made to /products');

  next();
});

module.exports = productsRouter;
