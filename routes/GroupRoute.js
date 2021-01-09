var express = require('express');
var router = express.Router();

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
    res.render('Group/groupAdd', null);
});

router.get('/detail', (req, res) => {
    if(!req.user){
        res.redirect('/login');
    }
    res.render('Group/groupDetail', null);
});

router.get('/delete', GroupController.DeleteGroup);

module.exports = router;