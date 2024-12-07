const express = require('express');
const { getEmployees, createEmployee, updateEmployee, deleteEmployee } = require('../controllers/EmployeeController');

const router = express.Router();

router.get('/', getEmployees); // Get all employees
router.post('/', createEmployee); // Register a new employee
router.put('/:id', updateEmployee); // Update an employee's details
router.delete('/:id', deleteEmployee); // Delete an employee

module.exports = router;
