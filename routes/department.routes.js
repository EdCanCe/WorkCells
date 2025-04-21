const express = require("express");
const router = express.Router();

const departmentController = require("../controllers/department.controller");
const employeeControllers = require("../controllers/employee.controller");
const departmentPrivilege = require("../util/departmentPrivilege/departmentPrivilege");
const isAuth = require("../util/is-auth");

router.get("/check", isAuth, departmentController.getCheckDepartment);
router.get("/:departmentID/modify", isAuth, departmentController.getModifyDepartment);
router.post("/:departmentID/modify", isAuth, departmentController.postModifyDepartment);
router.post(
    "/delete/:departmentID",
    isAuth,
    departmentController.postDeleteDeparment
);
router.get("/add", isAuth, departmentPrivilege, departmentController.getAddDepartment);
router.post("/add", isAuth, departmentPrivilege, departmentController.postAddDepartment);
router.get("/search", isAuth, departmentController.getDepartmentsPaginated);
router.get("/paginated", isAuth, departmentController.getEmployeesPaginated);
router.get("/employee/:userID", isAuth, employeeControllers.getEmployee);
router.get("/:departmentID", isAuth, departmentController.getEmployees);
router.get(
    "/:departmentID/find",
    isAuth,
    departmentController.getPaginatedEmployeesRH
);
router.get("/", isAuth, departmentController.getDepartments);

module.exports = router;