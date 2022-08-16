var auth = require("basic-auth");

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
  } else {
    return res.status(403).json({
      error: "ACCESS DENIED",
    });
  }
};
