const db = require('../config/db');
const bcrypt = require('bcrypt');

// User registration
exports.registerUser = async (req, res) => {
  const { name, email, password, contact } = req.body;

  // Input validation
  if (!name || !email || !password || !contact) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  // Hash the password for security
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = 'INSERT INTO users (name, email, password, contact) VALUES (?, ?, ?, ?)';
    db.query(query, [name, email, hashedPassword, contact], (err, results) => {
      if (err) {
        console.error(err);  
        return res.status(500).json({ error: 'Database insertion error' });
      }
      res.status(201).json({ message: 'User registered successfully', userId: results.insertId });
    });
  } catch (error) {
    console.error(error); 
    res.status(500).json({ error: 'Internal server error' });
  }
};

// User login
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  // Input validation
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  const query = 'SELECT * FROM users WHERE email = ?';
  db.query(query, [email], async (err, results) => {
    if (err || results.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    try {
      // Compare hashed passwords
      const isPasswordValid = await bcrypt.compare(password, results[0].password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      // Send user details excluding the password
      const user = { ...results[0] };
      delete user.password;

      res.status(200).json({ message: 'Login successful', user });
    } catch (error) {
      console.error(error); 
      res.status(500).json({ error: 'Internal server error' });
    }
  });
};
