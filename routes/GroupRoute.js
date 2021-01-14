var express = require('express');
var router = express.Router();

var GroupController = require('../controllers/GroupController/UpdateGroupController');

router.get('/', GroupController.ViewGroup);

router.get('/add', (req, res) => {
    if(!req.user){
        res.redirect('/login');
    }
    var message = undefined;
    if (req.session.error){
        message = req.session.error;
        req.session.error = undefined;
    }
    res.render('Group/groupAdd', {message});
});

router.post('/add/submit', GroupController.CreateGroup);

router.get('/edit', (req, res) => {
    if(!req.user){
        res.redirect('/login');
    }
    res.render('Group/groupAdd', null);
});

router.get('/detail', GroupController.GetGroup);

router.get('/detail/remove-member', GroupController.RemoveMember);

router.post('/detail/add-member', GroupController.AddMember);

router.get('/delete', GroupController.DeleteGroup);

module.exports = router;