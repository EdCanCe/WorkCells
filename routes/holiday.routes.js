const express = require("express");
const router = express.Router();

const holidayController = require("../controllers/holiday.controller");
const isAuth = require("../util/is-auth");
const holidayPrivilege = require("../util/holidayPrivilege/holidayPrivilege");

router.get("/check/:usedHolidayID", isAuth, holidayController.getCheckHoliday);

router.get(
    "check/:templateHolidayID",
    isAuth,
    holidayController.getCheckTemplateHoliday
);

router.get(
    "/check/modify/:usedHolidayID",
    isAuth,
    holidayController.getHolidayModify
);

router.post(
    "/check/delete/:usedHolidayID",
    isAuth,
    holidayController.postHolidayDelete
);

router.post(
    "/check/:usedHolidayID",
    isAuth,
    holidayController.postHolidayModify
);

router.get("/", isAuth, holidayController.getHolidays);

router.get("/search", isAuth, holidayController.listPaginated);

router.get("/add", isAuth, holidayPrivilege, holidayController.getHolidaysAdd);

router.get("/add/template", isAuth, holidayController.getTemplateHolidayAdd);

router.post("/add", isAuth, holidayController.postHolidaysAdd);

router.post("/add/template", isAuth, holidayController.postTemplateHolidayAdd);

router.get("/used", isAuth, holidayController.getUsedHoliday); // Ver feriados usados

module.exports = router;
