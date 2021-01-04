const mongoose = require("mongoose");
const InforScheduleSchema = mongoose.Schema({
  listCumRap: { type: mongoose.Schema.Types.ObjectId, ref: "Theatre" },
  maHeThongRap: { type: String, required: true },
  tenHeThongRap: { type: String, required: true },
  logo: { type: String, required: true },
  //sao ben day ko co cai nay danhSachPhim
  //thi ben day them 1 truong danh sach phim
  //model listcuprap daudau
  //danhSachPhim: { type: mongoose.Schema.Types.ObjectId, ref: "Movie" },
});

const ScheduleListInfor = mongoose.model(
  "ScheduleListInfor",
  InforScheduleSchema,
  "ScheduleListInfor"
);
module.exports = {
  InforScheduleSchema,
  ScheduleListInfor,
};
