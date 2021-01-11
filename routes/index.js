var express = require('express');
var router = express.Router();

const {db} = require('../database/db');

/* GET home page. */
router.get('/', function(req, res, next) {
  if(!req.user){
    res.redirect('/login');
  }
  const userCollection = db().collection('user');
  res.render('index', { title: 'Express' });
});

module.exports = router;
