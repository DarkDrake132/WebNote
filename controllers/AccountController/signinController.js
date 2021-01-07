const AccountModel = require('../../model/AccountModel');
var passwordHash = require('password-hash');
const passport = require('passport');

exports.getSignup = (req, res, next) => {
    const message = req.flash("error")[0];
    if (!req.isAuthenticated()) {
        res.render("user/signup", {
            title: "Đăng ký",
            message: message
        });
    } else {
        res.redirect("/");
    }
};

exports.postSignup = (req, res, next) => {
    passport.authenticate("local-signup", {
        successRedirect: "/login",
        failureRedirect: "/sign-up",
        failureFlash: true
    })(req, res, next);
}