const AccountModel = require('../../model/AccountModel');

exports.getUserProfile = (req, res) => {
    if(!req.user){
        res.redirect('/login');
    }
    res.render('user/user_info', null);
}

exports.updateEmailPhoneAndImage = (req, res, next) => {
    if(!req.user){
        res.redirect('/login');
    }
    req.user.email = req.body.email;
    req.user.phone = req.body.phone;
    req.user.avatar = req.body.image;
    let temp = req.user;
    AccountModel.updateEmailPhoneAndImage(temp);
    res.redirect('/profile');
}