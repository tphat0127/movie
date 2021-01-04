const mongoose = require("mongoose");
const CinemaSchema = mongoose.Schema({
  tenHeThongRap: { type: String, required: true },
  biDanh: { type: String, required: true },
  logo: { type: String, required: true },
});

// console.log("StationSchema",StationSchema);

const Cinema = mongoose.model("Cinema", CinemaSchema, "Cinema");
module.exports = {
  CinemaSchema,
  Cinema,
};
