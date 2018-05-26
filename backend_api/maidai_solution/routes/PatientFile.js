const express = require('express');
const router = express.Router();
const patientFileController = require('../controllers/patientFileController');
const checkAuth = require('../../middleware/check-auth');

router.get('/byDoctor',checkAuth, patientFileController.getPatientFilesByDoctor);
router.get('/:patientFileId', patientFileController.getPatientFileById);
router.post('/', checkAuth, patientFileController.addPatientFile);

module.exports = router;