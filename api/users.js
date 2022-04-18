const usersRouter = require('express').Router();

usersRouter.use((req, res, next) => {
  console.log('A request is being made to /users');

  next();
});

// usersRouter.get('/me', requireUser, (res, res, next) => {

// })

module.exports = usersRouter;
