const express = require("express");
const {
  getCinema,
  createCinema,
  deleteCinemaById,
  updateCinemaById,
} = require("../services/Cinema.service");
const router = express.Router();

router.get("/cinemas", getCinema);
router.post("/cinemas", createCinema);
router.put("/cinema/:id", updateCinemaById);
router.delete("/cinema/:id", deleteCinemaById);
module.exports = router; //  export default xuat ra ca 1 router
