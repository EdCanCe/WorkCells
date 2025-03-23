const express = require("express");
const router = express.Router();

const fault_controllers = require("../controllers/faults.controller");
const isAuth = require('../util/is-auth');

router.get("/add",isAuth, fault_controllers.get_add);
router.post("/",isAuth, fault_controllers.post_add);
router.get("/check",isAuth, fault_controllers.get_check);
router.get("/",isAuth, fault_controllers.get_root);
module.exports = router;
