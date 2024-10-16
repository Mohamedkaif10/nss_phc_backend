const express = require('express');
const { verifyToken } = require('../middleware/jwt');
const { addPatient } = require('../funtions/receptionist');

const router = express.Router();


router.post('/add-patient', verifyToken, async (req, res) => {
  const { name, OPid, age, gender, aadhar_number } = req.body;

  if (!name || !OPid || !age || !gender || !aadhar_number) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  const result = await addPatient(req.body, req.user.role);

  if (result.error) {
    return res.status(403).json({ message: result.error });
  }

  res.status(201).json({
    message: 'Patient added successfully!',
    patient: result
  });
});

module.exports = router;