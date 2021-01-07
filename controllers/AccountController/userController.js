const AccountModel = require('../../model/AccountModel');

exports.getUserProfile = (req, res) => {
    if(!req.user){
        res.redirect('/login');
    }
    res.render('user/user_info', null);
}