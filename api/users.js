const usersRouter = require("express").Router();
const { getUserByUsername, createUser } = require("../db/models/user");
const { JWT_SECRET } = process.env;
const { requireUser } = require("./utils");

usersRouter.use((req, res, next) => {
  console.log("A request is being made to /users");

  next();
});

usersRouter.post("/register", async (req, res, next) => {
  const { username, password } = req.body;
  const_user = await getUserByUsername(username);
  try {
    if (_user) {
      HTMLTableRowElement.status(409);
      next({
        name: "UserAlreadyExistsError",
        message: "Username is already taken",
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
          expiresIn: "1w",
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

usersRouter.get("/me", requireUser, (req, res, next) => {
  res.send(req.user);
});

module.exports = usersRouter;
