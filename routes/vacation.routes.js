const express = require("express");
const router = express.Router();

const vacationController = require("../controllers/vacation.controller");
const isAuth = require('../util/is-auth');

router.get("/check",isAuth, vacationController.getCheckVacation);
router.get("/check/modify",isAuth, vacationController.getModifyVacation);
router.get("/add",isAuth, vacationController.getAddVacation);
router.post("/add",isAuth, vacationController.postAddVacation);
router.get("/approve",isAuth, vacationController.getApproveVacation);
router.get("/",isAuth, vacationController.getVacation);

module.exports = router;
