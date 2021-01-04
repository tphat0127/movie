const express = require("express");
const { uploadImages } = require("../middleware/img/index");
const {
  createUser,
  login,
  updatePassword,
  getMe,
  uploadAvater,
  getUser,
  paginationUser,
  AddUser,
  updateUser,
  deleteUser,
  searchUser,
} = require("../services/User.service");
const {
  validateCreateUser,
} = require("../middleware/validation/user/create-user.validate");
const {
  validateChangePassword,
} = require("../middleware/validation/user/changePassword.validate");

const {
  validateGetUser,
} = require("../middleware/validation/user/get-user.validate");
const {
  validateAddUser,
} = require("../middleware/validation/user/add-user.validate");

const {
  validateUpdateUser,
} = require("../middleware/validation/user/update-user.validate");
const { authenticate, authorization } = require("../middleware/auth/index");
const router = express.Router();

router.get("/user", authenticate, authorization(["QuanTri"]), searchUser);
router.get("/me", authenticate, authorization(["KhachHang", "QuanTri"]), getMe);
router.post("/user", validateCreateUser, createUser);
router.post(
  "/addUser",
  validateAddUser,
  authenticate,
  authorization(["QuanTri"]),
  AddUser
);
router.post("/login", validateGetUser, login);
router.post(
  "/upload-avatar",
  authenticate,
  authorization(["KhachHang"]),
  uploadImages("hinhAnh"),
  uploadAvater
);
router.get(
  "/paginationUser",
  authenticate,
  authorization(["QuanTri"]),
  paginationUser
);
router.patch("/updatePassword", validateChangePassword, updatePassword);
router.put("/updateUser/:id", authenticate, validateUpdateUser, updateUser);
router.delete("/user/:id", deleteUser);
module.exports = router;
