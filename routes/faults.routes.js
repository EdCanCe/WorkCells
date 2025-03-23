const express = require("express");
const router = express.Router();

const faultControllers = require("../controllers/faults.controller");
const isAuth = require('../util/is-auth');

router.get("/add",isAuth, faultControllers.getAdd);
router.post("/",isAuth, faultControllers.postAdd);
router.get("/check",isAuth, faultControllers.getCheck);
router.get("/",isAuth, faultControllers.getRoot);
module.exports = router;
