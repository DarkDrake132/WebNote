var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/login', (req, res) => {
  res.render('user/login', {layout : 'layouts/user'});
});

router.get('/sign-up', (req, res) => {
  res.render('user/signup', {layout : 'layouts/user'});
});

module.exports = router;
