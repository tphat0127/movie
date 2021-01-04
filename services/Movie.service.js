const { Schema } = require("mongoose");
const { Movie } = require("../models/ListMovie.modal");
const { Theatre } = require("../models/MovieTheatre.modal");
const moment = require("moment");
const PAGE_SIZE = 2;
// hiển thị phim
module.exports.getMovie = (req, res, next) => {
  return Movie.find()
    .populate("lstLichChieuTheoPhim")
    .then((movies) => {
      return res.status(200).json(movies);
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
};

// thêm phim
module.exports.createMovie = (req, res, next) => {
  const {
    theatreId, //_id of MovieTheatre
    tenPhim,
    lstLichChieuTheoPhim,
    biDanh,
    trailer,
    hinhAnh,
    moTa,
    ngayKhoiChieu,
    danhGia,
  } = req.body;

  const newMovie = new Movie({
    tenPhim,
    lstLichChieuTheoPhim,
    biDanh,
    trailer,
    hinhAnh,
    moTa,
    ngayKhoiChieu,
    danhGia,
  });
  Theatre.findById(theatreId)
    .then((theatre) => {
      if (!theatre)
        return Promise.reject({
          status: 404,
          message: "Theatre not found",
        });
        theatre.danhSachPhim.push(newMovie);

      return Promise.all([newMovie.save(), theatre.save()]);
    })
    .then((result) => res.status(200).json(result[0]))
    .catch((err) => res.status(500).json(err));
};

// pagination movie
module.exports.paginationMovie = (req, res, next) => {
  var page = req.query.page;
  if (page) {
    page = parseInt(page);
    if (page < 1) {
      page = 1;
    }
    var soLuongBoQua = (page - 1) * PAGE_SIZE;
    Movie.find({})
      .skip(soLuongBoQua)
      .limit(PAGE_SIZE)
      .then((movies) => {
        return res.status(200).json(movies);
      })
      .catch((err) => {
        return res.status(500).json(err);
      });
  } else {
    return Movie.find()
      .then((movies) => {
        return res.status(200).json(movies);
      })
      .catch((err) => {
        return res.status(500).json(err);
      });
  }
};
// lấy danh sách phim theo ngày
module.exports.movieByDate = (req, res, next) => {
  console.log(req.query);
  const { formDate, toDate } = req.query;
  if (formDate && toDate) {
    let formatFromDate = moment(new Date(formDate)).format("DD-MM-YYYY");
    let formatToDate = moment(new Date(toDate)).format("DD-MM-YYYY");
    console.log("formatFromDate", formatFromDate);
    console.log("formatToDate", formatToDate);
    Movie.find({
      ngayKhoiChieu: {
        $gte: formDate,
        $lt: toDate,
      },
    })
      .then((movies) => {
        console.log(movies);
        return res.status(200).json(movies);
      })
      .catch((err) => {
        return res.status(500).json(err);
      });
  }
};

//update movie by id
module.exports.updateMovie = (req, res, next) => {
  const { id } = req.params;
  console.log("movieId", id);
  const {
    tenPhim,
    biDanh,
    trailer,
    hinhAnh,
    moTa,
    ngayKhoiChieu,
    danhGia,
  } = req.body;
  Movie.findById(id)
    .then((movie) => {
      if (!movie) {
        return Promise.reject({ status: 404, message: "Movie Not Found" });
      }
      console.log(movie);
      movie.tenPhim = tenPhim;
      movie.biDanh = biDanh;
      movie.trailer = trailer;
      movie.hinhAnh = hinhAnh;
      movie.moTa = moTa;
      movie.ngayKhoiChieu = ngayKhoiChieu;
      movie.danhGia = danhGia;
      return movie.save();
    })
    .then((movie) => res.status(200).json(movie))
    .catch((err) => {
      return res.status(500).json(err);
    });
};

//delete by id

module.exports.deleteMovieById = (req, res, next) => {
  const { id } = req.params;
  let _movie;
  Movie.findById(id)
    .then((movie) => {
      if (!movie) {
        return Promise.reject({
          status: 404,
          message: "Movie Not Found",
        });
      }
      _movie = movie;
      return movie.deleteOne();
    })
    .then(() => res.status(200).json({ message: "delete successfully" }))
    .catch((err) => res.status(500).json({ message: err.message }));
};
