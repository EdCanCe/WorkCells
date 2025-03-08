const express = require('express');
const router = express.Router();

const employeeContrllers= require('../controllers/employee.controller');
const { route } = require('./faults.routes');


router.get('/', employeeContrllers.get_root);

module.exports = router;