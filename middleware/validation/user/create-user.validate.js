const validator = require("validator");
const _ = require("lodash");
const { User } = require("../../../models/User.modal");

module.exports.validateCreateUser = async (req, res, next) => {
  const email = req.body.email;
  const soDt = req.body.soDt;
  const hoTen = req.body.hoTen;

  const error = {};

  if (!email) {
    error.email = "Email is required";
  } else if (!validator.isEmail(email)) {
    error.email = "Email is invalid";
  } else {
    const user = await User.findOne({ email });
    if (user) error.email = "Email exists";
  }

  if (!soDt) {
    error.soDt = "Phone Number is required";
  } else if (!validator.isMobilePhone(soDt)) {
    error.soDt = "Phone Number is invalid";
  }

  if (!hoTen) {
    error.hoTen = "FullName is require";
  }

  if (Object.keys(error).length > 0) {
    return res.status(400).json(error);
  }

  return next();
};
