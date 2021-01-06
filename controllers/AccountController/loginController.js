//const passport = require('passport');
const passport = require('passport');

exports.getLogin = (req, res, next) => {
    const message = req.flash("error")[0];
    if (!req.isAuthenticated()) {
        res.render("user/login", {
            title: "Đăng nhập",
            message: message,
            user: req.user,
        });
    } else {
        res.redirect("/");
    }
};

exports.PostLogin = (req, res, next) => {
    passport.authenticate("local-login", {
        successRedirect: "/",
        failureRedirect: "/login",
        failureFlash: true
    })(req, res, next);
};