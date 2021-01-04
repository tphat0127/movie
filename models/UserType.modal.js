const mongoose = require("mongoose");
const UserTypeSchema = mongoose.Schema({
  maLoaiNguoiDung: { type: String, required: true },
  maLoaiNguoiDung: { type: String, required: true },
});

// console.log("StationSchema",StationSchema);

const UserType = mongoose.model("UserType", UserTypeSchema, "UserType");
module.exports = {
  UserTypeSchema,
  UserType,
};
