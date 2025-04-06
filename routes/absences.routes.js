const express = require("express");
const router = express.Router();

const absencesControllers = require("../controllers/absences.controller");
const isAuth = require("../util/is-auth");
const absencePrivilege = require("../util/absencePrivilege/absencePrivilege");

router.get("/add", isAuth, absencesControllers.getAdd);
router.post("/add", isAuth, absencesControllers.postAdd);

router.get("/check", isAuth, absencesControllers.getCheck);
router.get("/search", isAuth, absencesControllers.getListPaginated);
router.get("/requests/all", isAuth,absencePrivilege, absencesControllers.getAllRequests);
router.get("/requests", isAuth,absencePrivilege, absencesControllers.getRequest);
router.get(
    "/requests/paginated",
    isAuth,
    absencesControllers.getRequestsPaginated
);
router.post(
    "/requests/approve/:absenceID",
    isAuth,absencePrivilege,
    absencesControllers.postRequestApprove
);
router.post(
    "/requests/deny/:absenceID",
    isAuth,absencePrivilege,
    absencesControllers.postRequestDeny
);

router.get("/", isAuth, absencesControllers.getRoot);

module.exports = router;
