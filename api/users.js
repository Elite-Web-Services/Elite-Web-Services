const usersRouter = require("express").Router();
const { getUserByUsername, createUser } = require("../db/models/user");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;
const { requireUser } = require("./utils");

usersRouter.post("/login", async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const user = await getUserByUsername(username);
    console.log("USER: ", user);
    if (user && user.password === password) {
      console.log("LOGIN SUCCESS");
      const token = jwt.sign(
        { id: user.id, username: username },
        process.env.JWT_SECRET,
        { expiresIn: "1w" }
      );

      res.send({
        message: `Welcome Back, ${user.username}.`,
        token: token,
      });
    } else {
      console.log("LOGIN FAIL");
      res.status(409);
      next({
        name: "Bad Login/Password",
        message: "Login error: you must supply a valid login/password",
      });
    }
  } catch ({ name, message }) {
    res.status(404);
    next({ name, message });
  }
});

usersRouter.post("/register", async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const _user = await getUserByUsername(username);
    if (_user) {
      res.status(409);
      next({
        name: "UserAlreadyExistsError",
        message: "Username is already taken",
      });
    } else {
      const user = await createUser({
        username,
        password,
      });
      console.log(user);
      const token = jwt.sign(
        {
          id: user.id,
          username,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "1w",
        }
      );
      res.send({
        message: `Thanks for registering, ${username}.`,
        token,
      });
    }
  } catch ({ name, message }) {
    res.status(404);
    next({ name, message });
  }
});

usersRouter.get("/me", requireUser, (req, res, next) => {
  res.send(req.user);
});

module.exports = usersRouter;
