const express = require("express");
const router = express.Router();

const uploadController = require("../controllers/uploads.controller");
const isAuth = require("../util/is-auth");

router.get("/absence/:mediaLink", isAuth, uploadController.getAbsenceFile);

module.exports = router;
