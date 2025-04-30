const express = require("express");
const router = express.Router();

const uploadController = require("../controllers/uploads.controller");
const isAuth = require("../util/is-auth");

router.get("/absence/:mediaLink", isAuth, uploadController.getAbsenceFile);
router.get("/fault/:mediaLink", isAuth, uploadController.getFaultFile);
router.get("/manual/:mediaLink", isAuth, uploadController.getManualfile);

module.exports = router;
