const mongoose = require("mongoose");
const InforScheduleSchema = mongoose.Schema({
  listCumRap: [{ type: mongoose.Schema.Types.ObjectId, ref: "Theatre" }],
  maHeThongRap: { type: String, required: true },
  tenHeThongRap: { type: String, required: true },
  logo: { type: String, required: true }
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
