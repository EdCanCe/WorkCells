const express = require("express");
const router = express.Router();

const lider_controllers = require("../controllers/lider.controllers");

router.get(
  "/checkdepartment/checkprofile/kpis",
  lider_controllers.get_check_kpis
);

router.get(
  "/checkdepartment/checkprofile",
  lider_controllers.get_check_profile
);

router.get("/checkdepartment", lider_controllers.get_check_department);

module.exports = router;
