const usersRouter = require("express").Router();
const {
  getUserByUsername,
  createUser,
  getAllUsers,
  addContacts,
  getUserByEmail,
  deleteUser,
} = require("../db/models/user");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;
const { requireUser, requireAdmin } = require("./utils");
const bcrypt = require("bcrypt");
const { User } = require("../db/models");

usersRouter.use("/", (req, res, next) => {
  console.log("Request to /users is being made.");
  next();
});

usersRouter.post("/login", async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const user = await getUserByUsername(username);
    console.log("USER: ", user);

    // CHANGE BCRYPT TO ASYNC SOMEHOW
    if (user && bcrypt.compareSync(password, user.password)) {
      console.log("LOGIN SUCCESS");
      const token = jwt.sign(
        { id: user.id, username: username, isAdmin: user.isAdmin },
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
  const { username, password, email } = req.body;

  try {
    const _user = await getUserByUsername(username);

    if (_user) {
      res.status(409);
      next({
        name: "UserAlreadyExistsError",
        message: "Username is already taken",
      });
    }
    const _email = await getUserByEmail(email);
    if (_email) {
      res.status(409);
      next({
        name: "EmailAlreadyInUseError",
        message: "Email is already registered",
      });
    } else {
      const user = await createUser({
        username,
        password,
        email,
      });
      console.log(user);
      const token = jwt.sign(
        {
          id: user.id,
          username,
          email,
          isAdmin: user.isAdmin,
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

usersRouter.get("/all", requireUser, async (req, res, next) => {
  const users = await getAllUsers();
  res.send(users);
});

usersRouter.patch("/contact/:userId", async (req, res, next) => {
  const { userId } = req.params;
  const {
    firstName,
    lastName,
    email,
    address,
    address2,
    city,
    state,
    zip,
    country,
  } = req.body;
  try {
    const updateContacts = await addContacts({
      id: +userId,
      firstName,
      lastName,
      email,
      address,
      address2,
      city,
      state,
      zip: +zip,
      country,
    });

    console.log("*******USERS API********", updateContacts);
    res.send({
      updateContacts,
    });
  } catch (error) {
    res.status(401);
    throw error;
  }
});

usersRouter.delete("/users/:userId", requireAdmin, async (req, res, next) => {
  try {
    const deleteTheUser = await deleteUser(req.params);

    console.log("REQUEST TO DELETE");
    res.send(deleteTheUser);
  } catch (error) {
    throw error;
  }
});

module.exports = usersRouter;
