const db = require('../config/db');

// Get all employees
exports.getEmployees = (req, res) => {
  const query = 'SELECT * FROM employees';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Database query error:', err);
      return res.status(500).json({ error: 'Database query error' });
    }
    res.status(200).json(results);
  });
};

// Register a new employee
exports.createEmployee = (req, res) => {
  const { name, employee_code, designation, headquarters } = req.body;

  // Validation for required fields
  if (!name || !employee_code || !designation || !headquarters) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const query =
    'INSERT INTO employees (name, employee_code, designation, headquarters) VALUES (?, ?, ?, ?)';
  db.query(query, [name, employee_code, designation, headquarters], (err, results) => {
    if (err) {
      console.error('Database insertion error:', err);
      return res.status(500).json({ error: 'Database insertion error' });
    }
    res.status(201).json({ message: 'Employee registered successfully', regid: results.insertId });
  });
};

// Update an employee's details
exports.updateEmployee = (req, res) => {
  const { id } = req.params;
  const { name, employee_code, designation, headquarters } = req.body;

  // Validation for required fields
  if (!name || !employee_code || !designation || !headquarters) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const query =
    'UPDATE employees SET name = ?, employee_code = ?, designation = ?, headquarters = ? WHERE id = ?';
  db.query(query, [name, employee_code, designation, headquarters, id], (err, results) => {
    if (err) {
      console.error('Database update error:', err);
      return res.status(500).json({ error: 'Database update error' });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    res.status(200).json({ message: 'Employee updated successfully' });
  });
};

// Delete an employee
exports.deleteEmployee = (req, res) => {
  const { id } = req.params;

  const query = 'DELETE FROM employees WHERE id = ?';
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error('Database deletion error:', err);
      return res.status(500).json({ error: 'Database deletion error' });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    res.status(200).json({ message: 'Employee deleted successfully' });
  });
};
