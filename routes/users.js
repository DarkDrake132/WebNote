var express = require('express');
var router = express.Router();
const loginController = require('../controllers/AccountController/loginController');
const userController = require('../controllers/AccountController/userController');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/profile', userController.getUserProfile);

router.get('/login', loginController.getLogin);

router.get('/sign-up', (req, res) => {
  res.render('user/signup', null);
});

router.post('/login', loginController.PostLogin);
module.exports = router;
