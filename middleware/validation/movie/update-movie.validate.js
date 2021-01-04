const validator = require("validator");
const _ = require("lodash");
const { Movie } = require("../../../models/ListMovie.modal");

module.exports.validateUpdateMovie = async (req, res, next) => {
  const tenPhim = req.body.tenPhim;
  const biDanh = req.body.biDanh;
  const trailer = req.body.trailer;
  const hinhAnh = req.body.hinhAnh;
  const moTa = req.body.moTa;
  const danhGia = req.body.danhGia;
  const error = {};

  if (!tenPhim) {
    error.tenPhim = "tenPhim is required";
  }
  if (!biDanh) {
    error.biDanh = "biDanh is required";
  }
  if (!trailer) {
    error.trailer = "trailer is required";
  }
  if (!hinhAnh) {
    error.hinhAnh = "hinhAnh is required";
  }
  if (!moTa) {
    error.moTa = "moTa is required";
  }
  if (!danhGia) {
    error.danhGia = "danhGia is required";
  }
  if (Object.keys(error).length > 0) {
    return res.status(400).json(error);
  }
  return next();
};
