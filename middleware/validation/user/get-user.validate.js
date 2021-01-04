const validator = require("validator");
const _ = require("lodash");
const { User } = require("../../../models/User.modal");

module.exports.validateGetUser = async (req, res, next) => {
  const email = req.body.email;
  const matKhau = req.body.matKhau;

  const error = {};
  //email
  if (!email) {
    error.email = "Email is required";
  } else if (!validator.isEmail(email)) {
    error.email = "Email is invalid";
  } else {
    const user = await User.findOne({ email });
    if (!user) error.email = "Email not exists";
  }
  // mat khau
  if (!matKhau) {
    error.matKhau = "matKhau is required";
  }
  if (Object.keys(error).length > 0) {
    return res.status(400).json(error);
  }
  return next();
};
