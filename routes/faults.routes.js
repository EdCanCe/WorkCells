const express = require("express");
const router = express.Router();

const faultControllers = require("../controllers/faults.controller");
const isAuth = require("../util/is-auth");
const faultPrivilege = require("../util/faultPrivilege/privilegeFault");

//: para indicar que es una variable
router.get("/search", isAuth, faultPrivilege, faultControllers.listPaginated);
router.get("/add", isAuth, faultPrivilege, faultControllers.getAdd);
router.post("/", isAuth, faultPrivilege, faultControllers.postAdd);
router.get("/check", isAuth, faultPrivilege, faultControllers.getCheck);
router.post("/delete", isAuth,faultPrivilege, faultControllers.postDelete);
router.get("/", isAuth, faultPrivilege, faultControllers.getRoot);
module.exports = router;
