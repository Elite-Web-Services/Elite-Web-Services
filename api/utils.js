function requireUser(req, res, next) {
  if (!req.user) {
    res.status(401);
    next({
      name: "MissingUserError",
      message: "You must be logged in to perform this action",
    });
  } else {
    next();
  }
}

function requireAdmin(req, res, next) {
  if (!req.user.isAdmin) {
    res.status(401);
    next({
      name: "MissingUserError",
      message: "You must be logged in to perform this action",
    });
  } else {
    console.log("REQUIRE ADMIN UTIL");
    next();
  }
}

module.exports = { requireUser, requireAdmin };
