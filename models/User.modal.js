const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const UserSchema = mongoose.Schema({
  email: { type: String, required: true },
  matKhau: { type: String, required: true },
  hoTen: { type: String, required: true },
  soDt: { type: String, required: true },
  maLoaiNguoiDung: { type: String, default: "KhachHang" },
  avatarUrl: { type: String },
});

// console.log("StationSchema",StationSchema);
UserSchema.pre("save", function (next) {
  console.log("pre save", this);
  const user = this;
  if (!user.isModified("matKhau")) return next();
  bcrypt
    .genSalt(10)
    .then((salt) => {
      console.log(salt);
      return bcrypt.hash(user.matKhau, salt);
    })
    .then((hash) => {
      console.log(hash);
      user.matKhau = hash;
      next();
    });
});

const User = mongoose.model("User", UserSchema, "User");
module.exports = {
  UserSchema,
  User,
};
