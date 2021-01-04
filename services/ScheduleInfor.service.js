const { Schema } = require("mongoose");
const { ScheduleListInfor } = require("../models/ListSchedule.modal");
const { Theatre } = require("../models/MovieTheatre.modal");

module.exports.createScheduleInfor = (req, res, next) => {
  const {
    maHeThongRap,
    tenHeThongRap,
    logo,
  } = req.body;
  return ScheduleListInfor.create({
    maHeThongRap,
    tenHeThongRap,
    logo,
  })
    .then((scheduleListInfo) => {
      console.log(scheduleListInfo);
      return res.status(200).json(scheduleListInfo);
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
};

module.exports.getScheduleInfor = (req, res, next) => {
  const maHeThongRap = req.query.maHeThongRap;
  console.log("maHeThongRap", maHeThongRap);
  if (maHeThongRap) {
    return ScheduleListInfor.find({ maHeThongRap })
      .select({ maHeThongRap: 1, danhSachPhim: 1, tenHeThongRap: 1, logo: 1 })
      .populate({
        path: "listCumRap",
        //select: "_id tenCumRap DiaChi danhSachPhim ",
        populate: {
          path: "danhSachPhim",
          populate: {
            path: "lstLichChieuTheoPhim"
          },
        },
      })
      .then((schedules) => {
        return res.status(200).json(schedules);
      })
      .catch((err) => {
        return res.status(500).json(err);
      });
  } else {
    return ScheduleListInfor.find()
      .select({ maHeThongRap: 1, tenHeThongRap: 1, logo: 1 })
      .populate({
        path: "listCumRap",
        select: "_id tenCumRap DiaChi danhSachPhim",
        populate: { path: "danhSachPhim" },
      })
      .then((schedules) => {
        return res.status(200).json(schedules);
      })
      .catch((err) => {
        return res.status(500).json(err);
      });
  }
};
