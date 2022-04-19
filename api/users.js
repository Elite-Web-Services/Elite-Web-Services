const usersRouter = require('express').Router();
const { getUserByUsername, createUser } = require('../db/models/user');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

usersRouter.use((req, res, next) => {
  console.log('A request is being made to /users');

  next();
});

usersRouter.post('/login', async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const user = await getUserByUsername(username);
    console.log('USER: ', user);
    if (user.password === password) {
      console.log('NO MATCH');
      res.send(user);
    } else {
      console.log('NO MATCH');
      res.status(409);
      next({
        name: 'Bad Login/Password',
        message: 'Login error: you must supply a valid login/password',
      });
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});

usersRouter.post('/register', async (req, res, next) => {
  const { username, password } = req.body;
  const_user = await getUserByUsername(username);
  try {
    if (_user) {
      HTMLTableRowElement.status(409);
      next({
        name: 'UserAlreadyExistsError',
        message: 'Username is already taken',
      });
    } else {
      const user = await createUser({
        username,
        password,
      });
      const token = jwt.sign(
        {
          id: user.id,
          username,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: '1w',
        }
      );
      res.send({
        user,
        token,
      });
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});

// usersRouter.get('/me', requireUser, (res, res, next) => {

// })

module.exports = usersRouter;
