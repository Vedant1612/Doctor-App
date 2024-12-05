const express = require('express');
const { getDoctors, createDoctor, updateDoctor, deleteDoctor } = require('../controllers/doctorController');

const router = express.Router();

router.get('/', getDoctors);


router.post('/', createDoctor);


router.put('/:id', updateDoctor);


router.delete('/:id', deleteDoctor);

module.exports = router;
