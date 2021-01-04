// Router
const express = require("express");
const { getUserType, createUserType } = require("../services/UserType.service");
const router = express.Router();

router.get("/userType", getUserType);
router.post("/userType", createUserType);
// middleware co duong dan
module.exports = router; //  export default xuat ra ca 1 router
