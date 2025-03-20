const express = require("express");
const router = express.Router();

const fault_controllers = require("../controllers/faults.controllers");

router.get("/add", fault_controllers.get_add);
router.post("/add", fault_controllers.post_add);
router.get("/check", fault_controllers.get_check);
router.get("/",fault_controllers.get_root);
module.exports = router;
