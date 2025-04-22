const express = require("express");
const router = express.Router();

const holidayController = require("../controllers/holiday.controller");
const isAuth = require("../util/is-auth");
const holidayPrivilege = require("../util/holidayPrivilege/holidayPrivilege");

router.get("/check/:usedHolidayID", isAuth, holidayController.getCheckHoliday);

router.get("/check/modify/:usedHolidayID",isAuth,holidayController.getHolidayModify);

router.post("/check/:usedHolidayID",isAuth,holidayController.postHolidayModify);

router.get("/", isAuth, holidayController.getHolidays);

router.get("/search", isAuth, holidayController.listPaginated);

router.get("/add", isAuth, holidayPrivilege, holidayController.getHolidaysAdd);

router.post("/add", isAuth, holidayController.postHolidaysAdd);

router.get("/check", isAuth, holidayController.getHoliday);

router.get("/used", isAuth, holidayController.getUsedHoliday); // Ver feriados usados

module.exports = router;
