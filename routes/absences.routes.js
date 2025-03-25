const express = require("express");
const router = express.Router();

const absencesControllers = require("../controllers/absences.controller");
const isAuth = require("../util/is-auth");

router.get("/approve", isAuth, absencesControllers.getApprove);

router.get("/add", isAuth, absencesControllers.getAdd);
router.post("/add", isAuth, absencesControllers.postAdd);

router.get("/check", isAuth, absencesControllers.getCheck);

router.get("/deny/:absenceID", isAuth, )

router.get("/", isAuth, absencesControllers.getRoot);

module.exports = router;
