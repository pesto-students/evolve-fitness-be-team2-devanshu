var auth = require("basic-auth");
const User = require("../models/adminUser");

//custom middlewares
exports.isAuthenticated = async (req, res, next) => {
  var user = await auth(req);
  if (user) {
    let checker =
      user.name === process.env.AUTH_EMAIL &&
      user.pass === process.env.AUTH_PASS;
    if (!checker) {
      return res.status(403).json({
        error: "ACCESS DENIED",
      });
    }
    next();
  }
};

//  is  admin custom middlewares
exports.isAdmin = async (req, res, next) => {
  const { id } = req.params;
  let user = await User.find({ userId: id });
  console.log("isAdmin", user, id);
  if (user.length === 0) {
    return res.status(400).json({
      error: "You are not USER",
    });
  } else if (user[0].role === 0) {
    return res.status(400).json({
      error: "You are not ADMIN, Access denied",
    });
  }

  next();
};
