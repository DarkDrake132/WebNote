//const passport = require('passport');
const passport = require('passport');

exports.getLogin = (req, res, next) => {
    const message = req.flash("error")[0];
    if (!req.isAuthenticated()) {
        res.render("user/login", {
            title: "Đăng nhập",
            message: message
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

exports.logOut = async(req, res, next) => {
    req.logout();
    res.redirect('/login');
}

exports.logOut = async(req, res, next) => {
    req.logout();
    res.redirect('/login');
}