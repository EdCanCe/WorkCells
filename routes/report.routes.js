const express = require("express");
const router = express.Router();

const reportControllers = require("../controllers/report.controller");
const isAuth = require("../util/is-auth");

router.get("/staffRotation", isAuth, reportControllers.getEmployeeRotation);
router.get("/", isAuth, reportControllers.getRoot);

module.exports = router;
