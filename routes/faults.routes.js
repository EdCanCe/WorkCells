const express = require("express");
const router = express.Router();

const fault_controllers = require("../controllers/faults.controller");

router.get("/add", fault_controllers.get_add);
router.get("/check", fault_controllers.get_check);
router.get("/", fault_controllers.get_root);
module.exports = router;
