var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
    if(!req.user){
        res.redirect('/login');
    }
    res.render('groupView', null);
});

module.exports = router;