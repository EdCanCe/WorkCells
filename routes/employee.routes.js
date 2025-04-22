const express = require("express");
const router = express.Router();

const employeeControllers = require("../controllers/employee.controller");
const isAuth = require("../util/is-auth");
const employeePrivilege = require("../util/employeePrivilege/employeePrivilege");

router.get("/me", isAuth, employeeControllers.getMe);
router.get(
    "/me/faults",
    isAuth,
    employeeControllers.getOwnFaults
);
router.get("/:userID/faults", isAuth, employeeControllers.getEmployeeFaults);
router.get("/add", isAuth, employeePrivilege, employeeControllers.getAdd);
router.post("/", isAuth, employeePrivilege, employeeControllers.postAdd);
router.get("/me/changePassword", isAuth, employeeControllers.getChangePassword);
router.post(
    "/me/changePassword",
    isAuth,
    employeeControllers.postChangePassword
);
router.get(
    "/:id/modify",
    isAuth,
    employeePrivilege,
    employeeControllers.getModify
);
router.post("/:id", isAuth, employeePrivilege, employeeControllers.postModify);
router.get("/search", isAuth, employeePrivilege, employeeControllers.getSearch);
router.get("/:id", isAuth, employeePrivilege, employeeControllers.getCheck);
router.get("/", isAuth, employeePrivilege, employeeControllers.getRoot);

module.exports = router;
