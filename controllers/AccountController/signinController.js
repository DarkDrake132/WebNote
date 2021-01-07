const AccountModel = require('../../model/AccountModel');
var passwordHash = require('password-hash');

exports.Register = (req, res) => {
    let username = req.body.name;
    let email = req.body.email;
    let password = req.body.pass;
    //let phone = req.body.phone;
    let password_hashed = passwordHash.generate(password);
    AccountModel.CreateUserAccount(username, email, password_hashed);
    res.redirect('/login');
}