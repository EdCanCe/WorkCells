const express = require("express");
const router = express.Router();

const employeeContrllers = require("../controllers/employee.controller");
const isAuth = require("../util/is-auth");
const employeePrivilege = require("../util/employeePrivilege/employeePrivilege");

router.get("/add", isAuth, employeePrivilege, employeeContrllers.getAdd);
router.post("/", isAuth, employeePrivilege, employeeContrllers.postAdd);
router.get(
    "/:id/modify",
    isAuth,
    employeePrivilege,
    employeeContrllers.getModify
);
router.post("/:id", isAuth, employeePrivilege, employeeContrllers.postModify);
router.get("/search", isAuth, employeePrivilege, employeeContrllers.getSearch);
router.get("/me", isAuth, employeePrivilege, employeeContrllers.getMe);
router.get("/:id", isAuth, employeePrivilege, employeeContrllers.getCheck);
router.get("/", isAuth, employeePrivilege, employeeContrllers.getRoot);

module.exports = router;
