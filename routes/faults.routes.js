const express = require("express");
const router = express.Router();

const faultControllers = require("../controllers/faults.controller");
const isAuth = require("../util/is-auth");
const faultPrivilege = require("../util/faultPrivilege/privilegeFault");

//: para indicar que es una variable
router.get("/search", isAuth, faultPrivilege, faultControllers.getSearch);
router.get("/add", isAuth, faultPrivilege, faultControllers.getAdd);
router.post("/", isAuth, faultPrivilege, faultControllers.postAdd);
router.get("/modify/:faultID", isAuth, faultControllers.getCheck);
router.post("/update/:faultID", isAuth, faultControllers.UpdateFault);
router.post("/delete", isAuth, faultPrivilege, faultControllers.postDelete);
router.get("/", isAuth, faultPrivilege, faultControllers.getRoot);
module.exports = router;
