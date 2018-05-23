const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');
const checkAuth = require('../../middleware/check-auth');

router.get('/', patientController.getPatients);
router.get('/:patientId', patientController.getPatientById);
router.post('/', checkAuth, patientController.addPatient);

module.exports = router;