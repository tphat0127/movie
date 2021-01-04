const express = require("express");
const {
  createScheduleInfor,
  getScheduleInfor,
} = require("../services/ScheduleInfor.service");
const router = express.Router();
router.get("/getScheduleInfor", getScheduleInfor);
router.post("/scheduleInfor", createScheduleInfor);
module.exports = router;
