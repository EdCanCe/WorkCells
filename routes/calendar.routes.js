const express = require("express");
const router = express.Router();

const calendarController = require("../controllers/calendar.controller");
const isAuth = require('../util/is-auth');

// JSON de los eventos en una fecha
router.get("/:date", isAuth, calendarController.getFetch);

// Página para consultar el calendario
router.get("/", isAuth, calendarController.getRoot);

module.exports = router;
