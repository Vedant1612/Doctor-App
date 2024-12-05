const db = require('../config/db');


exports.getDoctors = (req, res) => {
  const query = 'SELECT * FROM doctors';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Database query error:', err);
      return res.status(500).json({ error: 'Database query error' });
    }
    res.status(200).json(results);
  });
};


exports.createDoctor = (req, res) => {
  const { name, address, contact, area, qualification, medical } = req.body;

  // Validation for required fields
  if (!name || !address || !contact || !area || !qualification || !medical) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const query =
    'INSERT INTO doctors (name, address, contact, area, qualification, medical) VALUES (?, ?, ?, ?, ?, ?)';
  db.query(query, [name, address, contact, area, qualification, medical], (err, results) => {
    if (err) {
      console.error('Database insertion error:', err);
      return res.status(500).json({ error: 'Database insertion error' });
    }
    res.status(201).json({ message: 'Doctor added successfully', doctorId: results.insertId });
  });
};


exports.updateDoctor = (req, res) => {
  const { id } = req.params;
  const { name, address, contact, area, qualification, medical } = req.body;

  // Validation for required fields
  if (!name || !address || !contact || !area || !qualification || !medical) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const query =
    'UPDATE doctors SET name = ?, address = ?, contact = ?, area = ?, qualification = ?, medical = ? WHERE id = ?';
  db.query(query, [name, address, contact, area, qualification, medical, id], (err, results) => {
    if (err) {
      console.error('Database update error:', err);
      return res.status(500).json({ error: 'Database update error' });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ error: 'Doctor not found' });
    }

    res.status(200).json({ message: 'Doctor updated successfully' });
  });
};


exports.deleteDoctor = (req, res) => {
  const { id } = req.params;

  const query = 'DELETE FROM doctors WHERE id = ?';
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error('Database deletion error:', err);
      return res.status(500).json({ error: 'Database deletion error' });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ error: 'Doctor not found' });
    }

    res.status(200).json({ message: 'Doctor deleted successfully' });
  });
};
