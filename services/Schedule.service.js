const { ScheduleList } = require("../models/Schedule.modal");
module.exports.createSchedule = (req, res, next) => {
  const { maPhim, ngayChieuGioChieu, maRap, giaVe } = req.body;
  return ScheduleList.create({ maPhim, ngayChieuGioChieu, maRap, giaVe })
    .then((schedule) => {
      return res.status(200).json(schedule);
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
};

module.exports.getSchedule = (req, res, next) => {
  return ScheduleList.find()
    .then((scheduleList) => {
      return res.status(200).json(scheduleList);
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
};
