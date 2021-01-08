var express = require('express');
var router = express.Router();
var noteController = require('../controllers/ListNotesController/UpdateListNoteController');

/* GET home page. */
router.get('/', noteController.List);
router.get('/add', noteController.Add);
router.get('/delete', noteController.Delete);

module.exports = router;
