const validator = require("validator");
const _ = require("lodash");
const { User } = require("../../../models/User.modal");

module.exports.validateChangePassword = async (req, res, next) => {
  const email = req.body.email;
  const oldPassword = req.body.oldPassword;
  const newPassword = req.body.newPassword;
  const reNewPassword = req.body.reNewPassword;
  const error = {};
  //email
  if (!email) {
    error.email = "Email is required";
  } else if (!validator.isEmail(email)) {
    error.email = "Email is invalid";
  } else {
    const user = await User.findOne({ email });
    if (!user) error.email = "Email exists";
  }

  //password
  if (!oldPassword) {
    error.oldPassword = "password is required";
  }
  //password 2
  if (!newPassword) {
    error.newPassword = "Confirmed passowordis required";
  } else if (!reNewPassword) {
    error.reNewPassword = "password is required";
  } else if (validator.equals(oldPassword, newPassword)) {
    error.oldPassword = "Oldpassword and NewPassword not must match";
  } else if (!validator.equals(newPassword, reNewPassword)) {
    error.newPassword = "Newpassword and reNewPassword must match";
  }

  console.log(validator.equals(oldPassword, newPassword));
  if (Object.keys(error).length > 0) {
    return res.status(400).json(error);
  }
  return next();
};
