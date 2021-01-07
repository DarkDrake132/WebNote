var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
    if(!req.user){
        res.redirect('/login');
    }
    res.render('Group/groupView', null);
});

router.get('/add', (req, res) => {
    if(!req.user){
        res.redirect('/login');
    }
    res.render('Group/groupAdd', null);
});

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