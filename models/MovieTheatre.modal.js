const mongoose = require("mongoose");
const { ListCinemaSchema } = require("./Cinema.modal");
const TheatreSchema = mongoose.Schema({
  maHeThongRap: { type: String, required: true },
  danhSachPhim: [{ type: mongoose.Schema.Types.ObjectId, ref: "Movie" }], //cai Movie nay daudau
  tenCumRap: { type: String, required: true },
  DiaChi: { type: String, required: true },
  DanhSachRap: [ListCinemaSchema],
});

const Theatre = mongoose.model("Theatre", TheatreSchema, "Theatre");
module.exports = {
  TheatreSchema,
  Theatre,
};
