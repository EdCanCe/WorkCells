const express = require("express");
const router = express.Router();

const employeeContrllers = require("../controllers/employee.controller");
const isAuth = require("../util/is-auth");
const employeePrivilege = require("../util/employeePrivilege/employeePrivilege");

router.get("/add", isAuth, employeePrivilege, employeeContrllers.getAdd);
router.post("/", isAuth, employeePrivilege, employeeContrllers.postAdd);
router.get(
    "/check/modify",
    isAuth,
    employeePrivilege,
    employeeContrllers.getModify
);
router.get("/check", isAuth, employeePrivilege, employeeContrllers.getCheck);
router.get("/active", isAuth, employeePrivilege, employeeContrllers.getActive);
router.get("/idle", isAuth, employeePrivilege, employeeContrllers.getIdle);
router.get("/me", isAuth, employeePrivilege, employeeContrllers.getMe);
router.get("/", isAuth, employeePrivilege, employeeContrllers.getRoot);

module.exports = router;
