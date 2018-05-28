const express = require('express');
const router = express.Router();
const analyseFileController = require('../controllers/analyseFileController');
const checkAuth = require('../../middleware/check-auth');


router.post('/addAnalyseFile', checkAuth, analyseFileController.addAnalyseFile);

module.exports = router;