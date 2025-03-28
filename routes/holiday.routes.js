const express = require("express");
const router = express.Router();

const holidayController = require("../controllers/holiday.controller");
const isAuth = require("../util/is-auth");

router.get("/", isAuth, holidayController.getHolidays);

router.get('/search', isAuth, holidayController.listPaginated);

router.get("/add", isAuth, holidayController.getHolidaysAdd);

router.post("/add", isAuth, holidayController.postHolidaysAdd);

router.get("/check", isAuth, holidayController.getHoliday);

router.get("/used", isAuth, holidayController.getUsedHoliday); // Ver feriados usados

router.get("/check/modify", isAuth, holidayController.getHolidayModify);

module.exports = router;
