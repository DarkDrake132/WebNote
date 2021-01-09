var express = require('express');
var router = express.Router();

var GroupModel = require('../model/GroupModel');
var GroupController = require('../controllers/GroupController/UpdateGroupController');

router.get('/', GroupController.ViewGroup);

router.get('/add', (req, res) => {
    if(!req.user){
        res.redirect('/login');
    }
    res.render('Group/groupAdd', null);
});

router.post('/add/submit', GroupController.CreateGroup);

router.get('/edit', (req, res) => {
    if(!req.user){
        res.redirect('/login');
    }
    res.render('Group/groupEdit', null);
});

router.get('/detail', (req, res) => {
    if(!req.user){
        res.redirect('/login');
    }
    res.render('Group/groupDetail', null);
});

module.exports = router;