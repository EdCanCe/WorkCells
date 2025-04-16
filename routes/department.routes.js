const express = require("express");
const router = express.Router();

const departmentController = require("../controllers/department.controller");
const isAuth = require("../util/is-auth");

router.get("/check", isAuth, departmentController.getCheckDepartment);
router.get("/check/modify", isAuth, departmentController.getModifyDepartment);
router.post("/delete/:departmentID", isAuth, departmentController.postDeleteDeparment)
router.get("/add", isAuth, departmentController.getAddDepartment);
router.get("/", isAuth, departmentController.getDepartments);

module.exports = router;
