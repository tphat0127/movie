const validator = require("validator");
const _ = require("lodash");
const { User } = require("../../../models/User.modal");

module.exports.validateAddUser = async (req, res, next) => {
  const email = req.body.email;
  const matKhau = req.body.matKhau;
  const soDt = req.body.soDt;
  const hoTen = req.body.hoTen;
  const maLoaiNguoiDung = req.body.maLoaiNguoiDung;

  const error = {};
  //email
  if (!email) {
    error.email = "Email is required";
  } else if (!validator.isEmail(email)) {
    error.email = "Email is invalid";
  } else {
    const user = await User.findOne({ email });
    if (user) error.email = "Email exists";
  }
  // mat khau
  if (!matKhau) {
    error.matKhau = "matKhau is required";
  }
  // soDt
  if (!soDt) {
    error.soDt = "Phone Number is required";
  } else if (!validator.isMobilePhone(soDt)) {
    error.soDt = "Phone Number is invalid";
  }
  // hoTen
  if (!hoTen) {
    error.hoTen = "FullName is require";
  }
  if (!maLoaiNguoiDung) {
    error.maLoaiNguoiDung = "maLoaiNguoiDung is require";
  } else if (maLoaiNguoiDung !== "KhachHang" && maLoaiNguoiDung !== "QuanTri") {
    error.maLoaiNguoiDung = "maLoaiNguoiDung is invalid";
  }
  if (Object.keys(error).length > 0) {
    return res.status(400).json(error);
  }
  return next();
};
