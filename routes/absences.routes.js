const express = require("express");
const router = express.Router();

const absencesControllers = require("../controllers/absences.controller");
const isAuth = require("../util/is-auth");

router.get("/aprove", isAuth, absencesControllers.get_aprove);

router.get("/add", isAuth, absencesControllers.get_add);
router.post("/add", absences_controllers.post_add);

router.get("/check", isAuth, absencesControllers.get_check);

router.get("/", isAuth, absencesControllers.get_root);

module.exports = router;
