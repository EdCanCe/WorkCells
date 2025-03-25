const express = require('express');
const router = express.Router();

const employeeContrllers= require('../controllers/employee.controller');


router.get('/add',employeeContrllers.getAdd);
router.get('/check/modify',employeeContrllers.getModify);
router.get('/check',employeeContrllers.getCheck);
router.get('/me',employeeContrllers.getMe);
router.get('/', employeeContrllers.getRoot);

module.exports = router;