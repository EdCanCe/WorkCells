const express = require("express");
const router = express.Router();

const departmentController = require("../controllers/department.controller");
const isAuth = require("../util/is-auth");

router.get("/check",isAuth, departmentController.get_check_department);
router.get("/check/modify",isAuth, departmentController.get_modify_department);
router.get("/add",isAuth, departmentController.get_add_department);
router.get("/", isAuth,departmentController.get_departments);

module.exports = router;
