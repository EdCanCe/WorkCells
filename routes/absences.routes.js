const express = require("express");
const router = express.Router();

const absencesControllers = require("../controllers/absences.controller");
const isAuth = require("../util/is-auth");


router.get("/add", isAuth, absencesControllers.getAdd);
router.post("/add", isAuth, absencesControllers.postAdd);

router.get("/check", isAuth, absencesControllers.getCheck);

router.get("/requests", isAuth, absencesControllers.getRequest);
router.get("/requests/paginated", isAuth, absencesControllers.getRequestsPaginated);
router.post("/requests/approve/:absenceID", isAuth, absencesControllers.postRequestApprove);
router.post("/requests/deny/:absenceID", isAuth, absencesControllers.postRequestDeny);

router.get("/", isAuth, absencesControllers.getRoot);

module.exports = router;
