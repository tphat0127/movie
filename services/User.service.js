const { Schema } = require("mongoose");
const { User } = require("../models/User.modal");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const util = require("util");
const jwtSign = util.promisify(jwt.sign);
const config = require("../config/index");
const PAGE_SIZE = 2;
module.exports.createUser = (req, res, next) => {
  const { matKhau, email, soDt, hoTen } = req.body;
  User.create({ matKhau, email, soDt, hoTen })
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
};

module.exports.login = (req, res, next) => {
  const { email, matKhau } = req.body;
  let _user;
  User.findOne({ email })
    .then((user) => {
      if (!user)
        return Promise.reject({ status: 404, message: "User Not Found" });
      _user = user;
      return bcrypt.compare(matKhau, user.matKhau);
    })
    .then((isMatched) => {
      if (!isMatched)
        return Promise.reject({
          status: 400,
          message: "matKhau sai",
        });
      const payload = {
        _id: _user._id,
        email: _user.eamil,
        hoTen: _user.hoTen,
        soDt: _user.soDt,
        email: _user.email,
        maLoaiNguoiDung: _user.maLoaiNguoiDung,
      };
      return jwtSign(payload, config.JWT_SECRET_KEY, {
        expiresIn: "1h",
      }).then((token) => {
        return res.status(200).json({ message: "login successfully", token });
      });
    })
    .catch((err) => res.status(err.status).json(err));
};

module.exports.updatePassword = (req, res, next) => {
  const { email, oldPassword, newPassword, reNewPassword } = req.body;
  let _user;
  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return Promise.reject({
          status: 404,
          message: "User Not Found",
        });
      }
      _user = user;
      return bcrypt.compare(oldPassword, _user.matKhau);
    })
    .then((isMatched) => {
      if (!isMatched) {
        return Promise.reject({
          status: 400,
          message: "Password incorrect",
        });
      }
      _user.matKhau = newPassword;
      return _user.save();
    })
    .then(() => {
      return res.status(200).json({ message: "Update Password Successfully" });
    })
    .catch((err) => res.status(500).json(err));
};

module.exports.getMe = (req, res, next) => {
  res.status(200).json(req.user);
};

module.exports.uploadAvater = (req, res, next) => {
  console.log("token", req.user);
  User.findById(req.user._id)
    .then((user) => {
      if (!user) return Promise.reject({ message: "User not found" });
      user.avatarUrl = `${req.file.fieldname}s/${req.file.filename}`;
      return user.save();
    })
    .then((user) => res.status(200).json(user))
    .catch((err) => res.json(err));
};

module.exports.getUser = (req, res, next) => {
  return User.find()
    .then((users) => {
      return res.status(200).json(users);
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
};

module.exports.paginationUser = (req, res, next) => {
  var page = req.query.page;
  if (page) {
    page = parseInt(page);
    if (page < 1) {
      page = 1;
    }
    var soLuongBoQua = (page - 1) * PAGE_SIZE;
    User.find({})
      .skip(soLuongBoQua)
      .limit(PAGE_SIZE)
      .then((users) => {
        return res.status(200).json(users);
      })
      .catch((err) => {
        return res.status(500).json(err);
      });
  } else {
    return User.find()
      .then((users) => {
        return res.status(200).json(users);
      })
      .catch((err) => {
        return res.status(500).json(err);
      });
  }
};

module.exports.AddUser = (req, res, next) => {
  const { matKhau, email, soDt, hoTen, maLoaiNguoiDung } = req.body;

  return User.create({
    matKhau,
    email,
    soDt,
    hoTen,
    maLoaiNguoiDung,
  })
    .then((user) => {
      return res.status(200).json(user);
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
};

//update movie by id
module.exports.updateUser = (req, res, next) => {
  const { id } = req.params;
  console.log("user", id);
  const { email, soDt, hoTen } = req.body;
  User.findById(id)
    .then((user) => {
      if (!user) {
        return Promise.reject({ status: 404, message: "User Not Found" });
      }
      user.email = email;
      user.soDt = soDt;
      user.hoTen = hoTen;

      return user.save();
    })
    .then((user) => res.status(200).json(user))
    .catch((err) => {
      return res.status(500).json(err);
    });
};

//delete by id

module.exports.deleteUser = (req, res, next) => {
  const { id } = req.params;
  let _user;
  User.findById(id)
    .then((user) => {
      if (!user) {
        return Promise.reject({
          status: 404,
          message: "User Not Found",
        });
      }
      _user = user;
      return user.deleteOne();
    })
    .then(() => res.status(200).json({ message: "delete successfully" }))
    .catch((err) => res.status(500).json({ message: err.message }));
};

module.exports.searchUser = (req, res, next) => {
  var user = req.query.user;
  if (user) {
    // model.findOne({name: new RegExp('^'+name+'$', "i")}, function(err, doc) {
    //Do your action here..
    // });
    console.log("user", user);
    User.find({
      hoTen: new RegExp(".*" + user + ".*", "i"),
    })
      .then((users) => {
        return res.status(200).json(users);
      })
      .catch((err) => {
        return res.status(500).json(err);
      });
  } else {
    return User.find()
      .then((users) => {
        return res.status(200).json(users);
      })
      .catch((err) => {
        return res.status(500).json(err);
      });
  }
};
