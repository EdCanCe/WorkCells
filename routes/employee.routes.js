const express = require("express");
const router = express.Router();

const employeeContrllers = require("../controllers/employee.controller");
const isAuth = require("../util/is-auth");

router.get("/add", isAuth, employeeContrllers.getAdd);
router.post("/", isAuth, employeeContrllers.postAdd);
router.get("/check/modify", isAuth, employeeContrllers.getModify);
router.get("/check", isAuth, employeeContrllers.getCheck);
router.get("/me", isAuth, employeeContrllers.getMe);
router.get("/", isAuth, employeeContrllers.getRoot);

module.exports = router;
