const mongoose = require("mongoose");
const ListScheduleSchema = mongoose.Schema({
  ngayChieuGioChieu: { type: Date, required: true },
  maRap: { type: String, required: true },
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
