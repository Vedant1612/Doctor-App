const db = require('../config/db');

// Schedule a visit
exports.scheduleVisit = (req, res) => {
  const { userId, doctorId, visitDate, reason } = req.body;

  // Input validation
  if (!userId || !doctorId || !visitDate || !reason) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const query = 'INSERT INTO visits (user_id, doctor_id, visit_date, reason) VALUES (?, ?, ?, ?)';
  db.query(query, [userId, doctorId, visitDate, reason], (err, results) => {
    if (err) {
      console.error(err);  
      return res.status(500).json({ error: 'Database insertion error' });
    }
    res.status(201).json({ message: 'Visit scheduled successfully', visitId: results.insertId });
  });
};

// Get all visits for a user
exports.getUserVisits = (req, res) => {
  const { userId } = req.params;

  // Input validation
  if (!userId) {
    return res.status(400).json({ error: 'User ID is required' });
  }

  const query = `
    SELECT visits.id, visits.visit_date, visits.reason, doctors.name AS doctor_name 
    FROM visits
    INNER JOIN doctors ON visits.doctor_id = doctors.id
    WHERE visits.user_id = ?
  `;
  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error(err);  
      return res.status(500).json({ error: 'Database query error' });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: 'No visits found for this user' });
    }
    res.status(200).json(results);
  });
};
