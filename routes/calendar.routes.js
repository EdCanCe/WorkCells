const express = require("express");
const router = express.Router();

const calendarController = require("../controllers/calendar.controller");
const isAuth = require('../util/is-auth');

router.get("/", isAuth, calendarController.getRoot);
router.get("/", isAuth, calendarController.getFetch);

module.exports = router;
