const AccountModel = require('../../model/AccountModel');
var passwordHash = require('password-hash');

exports.Register = (req, res, next) => {
    console.log('.');
    let username = req.body.name;
    //let display_name = req.body.display_name;
    //let date_of_birth = req.body.date_of_birth;
    //let phone = req.body.phone;
    let email = req.body.email;
    let password = req.body.password;
    let password_hashed = passwordHash.generate(password);
    const user = {
        username: username,
        display_name: "",
        date_of_birth: "",
        phone: phone,
        email: email,
        password: password_hashed,
        avatar: ""
    }
    console.log(user);
    AccountModel.CreateUserAccount(user);
    res.redirect('/users/login');
}