const mongoose = require("mongoose");
const ListScheduleSchema = mongoose.Schema({
  //maPhim: { type: mongoose.Schema.Types.ObjectId, ref: "Movie" }, //cai maphim nay 
  ngayChieuGioChieu: { type: Date, required: true },
  maRap: { type: mongoose.Schema.Types.ObjectId, ref: "Theatre" },
  giaVe: { type: Number, required: true },
});

const ScheduleList = mongoose.model(
  "ScheduleList",
  ListScheduleSchema,
  "ScheduleList"
);
module.exports = {
  ListScheduleSchema,
  ScheduleList,
};
