const express = require("express");
const router = express.Router();

const vacationController = require("../controllers/vacation.controller");
const isAuth = require("../util/is-auth");
const vacationPrivilege = require("../util/vacationPrivilege/vacationPrivilege");
const methodOverride = require("method-override");
router.use(methodOverride("_method"));

router.get("/check/:vacationID", isAuth, vacationController.getCheckVacation);

router.get(
    "/check/modify/:vacationID",
    isAuth,
    vacationController.getModifyVacation
);
router.get("/add", isAuth, vacationController.getAddVacation);
router.post("/add", isAuth, vacationController.postAddVacation);
router.get(
    "/requests",
    isAuth,
    vacationPrivilege,
    vacationController.getRequests
);

router.post("/update/:vacationID",isAuth, vacationController.updateVacation);


router.post(
    "/requests/approve/:vacationID",
    isAuth,
    vacationPrivilege,
    vacationController.postRequestApprove
);
router.post(
    "/requests/deny/:vacationID",
    isAuth,
    vacationPrivilege,
    vacationController.postRequestDeny
);
router.get("/", isAuth, vacationController.getRoot);

module.exports = router;
