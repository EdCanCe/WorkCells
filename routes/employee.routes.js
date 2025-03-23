const express = require("express");
const router = express.Router();

const employeeControllers = require("../controllers/employee.controller");

router.get("/add", employeeControllers.getAdd);
router.get("/check/modify", employeeControllers.getModify);
router.get("/check", employeeControllers.getCheck);
router.get("/me", employeeControllers.getMe);
router.get("/", employeeControllers.getRoot);

module.exports = router;
