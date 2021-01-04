const express = require("express");
const { createTheatre, getTheatre } = require("../services/Theatre.service");
const router = express.Router();
router.post("/createTheatre", createTheatre);
router.get("/getTheatre", getTheatre);
module.exports = router;
