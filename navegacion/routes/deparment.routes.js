const express = require('express');
const router = express.Router();

const departmentController = require('../controllers/department.controller')

router.get('/check', departmentController.get_check_department);
//router.get('/check/modify', departmentController);
router.get('/add', departmentController.get_add_department);
router.get('/', departmentController.get_departments);

module.exports = router;