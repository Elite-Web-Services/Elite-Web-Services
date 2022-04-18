const apiRouter = require('express').Router();
const usersRouter = require('./users');
const productsRouter = require('./products');

apiRouter.get('/', (req, res, next) => {
  res.send({
    message: 'API is under construction!',
  });
});

apiRouter.get('/health', (req, res, next) => {
  res.send({
    healthy: true,
  });
});

usersRouter.use('/users', usersRouter);
productsRouter.use('/products', productsRouter);

// place your routers here

module.exports = apiRouter;
