const express = require('express');
const router = express.Router();

const SaveDataController = require('../../controllers/API/SaveDataService');

router.get('/save', SaveDataController.Save);

module.exports = router;