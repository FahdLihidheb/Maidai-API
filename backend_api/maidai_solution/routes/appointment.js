const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appoinmentController');
const checkAuth = require('../../middleware/check-auth');

router.get('/byDoctor',checkAuth, appointmentController.getAppointmentByDoctor);
router.get('/:appointmentId', appointmentController.getAppointmentById);
router.get('/byPateintFile/:patientFileId', appointmentController.getAppointmentByPatientFile);
router.post('/', checkAuth, appointmentController.addAppointment);

module.exports = router;