const { Schema } = require("mongoose");
const { Cinema } = require("../models/ListCinema.modal");

// hiển thị rap
module.exports.getCinema = (req, res, next) => {
  return Cinema.find()
    .then((cinemas) => {
      return res.status(200).json(cinemas);
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
};

// thêm rạp
module.exports.createCinema = (req, res, next) => {
  const { tenHeThongRap, biDanh, logo } = req.body;
  return Cinema.create({
    tenHeThongRap,
    biDanh,
    logo,
  })
    .then((cinema) => {
      return res.status(200).json(cinema);
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
};

//update rạp by id

module.exports.updateCinemaById = (req, res, next) => {
  const { id } = req.params;
  const { tenHeThongRap, biDanh, logo } = req.body;
  Cinema.findById(id)
    .then((cinema) => {
      if (!cinema) {
        return Promise.reject({ status: 404, message: "Cinema not found" });
      }
      cinema.tenHeThongRap = tenHeThongRap;
      cinema.biDanh = biDanh;
      cinema.logo = logo;
      return cinema.save();
    })
    .then((cinema) => res.status(200).json(cinema))
    .catch((err) => {
      if (!err.status) return res.status(500).json(err);
      return res.status(err.status).json({ message: err.message });
    });
};

//delete by id

module.exports.deleteCinemaById = (req, res, next) => {
  const { id } = req.params;
  let _cinema;
  Cinema.findById(id)
    .then((cinema) => {
      if (!cinema) {
        return Promise.reject({
          status: 404,
          message: "Cinema Not Found",
        });
      }
      _cinema = cinema;
      return cinema.deleteOne();
    })
    .then(() => res.status(200).json({ message: "delete successfully" }))
    .catch((err) => res.status(500).json({ message: err.message }));
};
