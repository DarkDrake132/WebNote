var express = require('express');
var router = express.Router();
const signinController = require('../controllers/AccountController/signinController');

router.post('/register', signinController.postSignup);

module.exports = router;