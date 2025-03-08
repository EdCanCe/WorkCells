const express = require("express");
const router = express.Router();

const holidayController = require("../controllers/holiday.controller");

router.get("/", holidayController.getHolidays);

router.get("/add", holidayController.getHolidaysAdd);

router.get("/check", holidayController.getHoliday);

router.get("/check/modify", holidayController.getHolidayModify);

module.exports = router;
