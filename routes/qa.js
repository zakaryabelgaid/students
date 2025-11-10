const express = require('express');
const router = express.Router();
const questionController = require('../controllers/questionController');

router.get('/', questionController.getQA);
router.post('/', questionController.submitQuestion);

module.exports = router;

