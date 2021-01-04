const express = require("express");
const { createSchedule, getSchedule } = require("../services/Schedule.service");
const { authenticate, authorization } = require("../middleware/auth/index");
const {
  validateCreateSchedule,
} = require("../middleware/validation/schedule/create-schedule.validate");
const router = express.Router();
router.get("/getSchedule", getSchedule);
router.post(
  "/schedule",
  authenticate,
  authorization(["QuanTri"]),
  validateCreateSchedule,
  createSchedule
);
module.exports = router;
