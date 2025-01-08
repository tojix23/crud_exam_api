const express = require('express');
const router = express.Router();

// SERVICES
const getEmployees = require('../services/retrieve'); 
const createEmployee = require('../services/create');
const deleteEmployee = require('../services/delete');
const updateEmployee = require('../services/update');
// METHOD ROUTES
router.get('/getEmployees', getEmployees);
router.post('/createEmployee', createEmployee);
router.post('/deleteEmployee', deleteEmployee);
router.post('/updateEmployee', updateEmployee);
module.exports = router;
