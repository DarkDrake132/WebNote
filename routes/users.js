var express = require('express');
var router = express.Router();
const loginController = require('../controllers/AccountController/loginController');
const signinController = require('../controllers/AccountController/signinController');
const userController = require('../controllers/AccountController/userController');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/profile', userController.getUserProfile);

router.get('/login', loginController.getLogin);

router.get('/sign-up', signinController.getSignup);

router.post('/login', loginController.PostLogin);

router.post('/change-info', userController.updateEmailPhoneAndImage);
module.exports = router;
