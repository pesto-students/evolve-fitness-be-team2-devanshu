const User = require("../models/adminUser");

// create user controller
exports.createUser = (req, res) => {
  const user = new User(req.body);
  user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        err: "NOT able to save user in DB",
      });
    }
    res.json({
      name: user.name,
      email: user.email,
      fitnessCenter: user.fitnessCenter,
    });
  });
};

exports.getUserById = async (req, res) => {
  const { userId } = req.params;
  let user = await User.find({ userId });
  if (user.length === 1) {
    if (user[0].role === 1) {
      return res.status(200).json({
        sucess: "You have ADMIN, Access",
      });
    }
  } else {
    return res.status(400).json({
      sucess: "You are not ADMIN, Access denied",
    });
  }
};
