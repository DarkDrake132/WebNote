var express = require('express');
var router = express.Router();
const loginController = require('../controllers/AccountController/loginController');
const signinController = require('../controllers/AccountController/signinController');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/login', (req, res) => {
  res.render('user/login', null);
});

router.get('/sign-up', (req, res) => {
  res.render('user/signup', null);
});

router.post('/sign-up/register', signinController.Register);

module.exports = router;
