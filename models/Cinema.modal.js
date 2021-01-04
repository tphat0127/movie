const mongoose = require("mongoose");
const ListCinemaSchema = mongoose.Schema({
  tenRap: { type: String, required: true },
});

const CinemaList = mongoose.model("CinemaList", ListCinemaSchema, "CinemaList");
module.exports = {
  ListCinemaSchema,
  CinemaList,
};
