const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const doctorRoutes = require('./routes/doctorRoutes');
const visitRoutes = require('./routes/visitRoutes');
const employeeRoutes = require('./routes/employeeRoutes');

const app = express();
app.use(bodyParser.json());

// Use routes
app.use('/api/user', userRoutes);
app.use('/api/doctor', doctorRoutes);
app.use('/api/visit', visitRoutes);
app.use('/api/employee', employeeRoutes);

module.exports = app;
