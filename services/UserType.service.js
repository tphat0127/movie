const { Schema } = require("mongoose");
const { UserType } = require("../models/UserType.modal");

module.exports.getUserType = (req, res, next) => {
  return UserType.find()
    .then((type) => {
      return res.status(200).json(type);
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
};

module.exports.createUserType = (req, res, next) => {
  
  const { maLoaiNguoiDung, tenLoai } = req.body;
  return UserType.create({ maLoaiNguoiDung, tenLoai })
    .then((type) => {
      return res.status(200).json(type);
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
};
