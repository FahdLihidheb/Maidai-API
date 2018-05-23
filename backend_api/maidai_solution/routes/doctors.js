const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctorController');
const checkAuth = require('../../middleware/check-auth');

router.get('/', doctorController.getDoctors);
router.get('/:doctorId', doctorController.getDoctorById);
router.get('/profession/:profession', doctorController.getDoctorsByProf);
router.post('/token', checkAuth, doctorController.getDoctorByToken);

module.exports = router;