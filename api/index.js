const apiRouter = require('express').Router();
const usersRouter = require('./users');
const productsRouter = require('./products');
const cartsRouter = require('./carts');
const { getUserByUsername } = require('../db/models/user');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

apiRouter.use(async (req, res, next) => {
  console.log('Checking for authorization...');
  const prefix = `Bearer `;
  const auth = req.header('Authorization');
  if (!auth) {
    console.log('No auth provided. Continuing.');
    next();
  } else if (auth.startsWith(prefix)) {
    const token = auth.slice(prefix.length);
    try {
      const { username } = jwt.verify(token, JWT_SECRET);
      if (username) {
        console.log('Good token. Setting user.');
        user = await getUserByUsername(username);
        delete user.password;
        req.user = user;
        next();
      } else {
        res.status(409);
        next({ name: 'BadTokenError', message: 'Invalid Token' });
      }
    } catch ({ name, message }) {
      next({ name, message });
    }
  } else {
    res.status(409);
    next({
      name: 'AuthorizationHeaderError',
      message: `Authorization token must start with ${prefix}`,
    });
  }
});

apiRouter.get('/', (req, res, next) => {
  res.send({
    message: 'specify an api route to proceed',
  });
});

apiRouter.get('/health', (req, res, next) => {
  res.send({
    healthy: true,
  });
});

apiRouter.use('/users', usersRouter);
apiRouter.use('/products', productsRouter);
apiRouter.use('/carts', cartsRouter);

apiRouter.use((error, req, res, next) => {
  console.log('SENDING ERROR: ', error);
  res.send(error);
});

// place your routers here

module.exports = apiRouter;
