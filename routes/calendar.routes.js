const express = require("express");
const router = express.Router();

const calendarController = require("../controllers/calendar.controller");
const isAuth = require('../util/is-auth');

router.get("/", isAuth, calendarController.getRoot);

module.exports = router;
