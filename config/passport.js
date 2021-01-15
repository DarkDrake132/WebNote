// passport configuration
var User = require('../model/AccountModel');
var LocalStrategy = require('passport-local').Strategy;
//var bcrypt = require('bcryptjs');
var nodemailer = require('nodemailer');
const {db} = require('../database/db');
const passwordHash = require('password-hash');
var ObjectId = require('mongodb').ObjectId;

module.exports = function(passport) {
  passport.serializeUser(function(user, done) {
    done(null, user._id);
  });

  passport.deserializeUser(function(id, done) {
    const userCollection = db().collection('user');
    userCollection.findOne({'_id' : ObjectId(id)})
      .then(function(user) {
        done(null, user);
      })
      .catch(function(err) {
        console.log(err);
      });
  });
  passport.use(
      'local-login',
      new LocalStrategy(
          async function(username, password, done) {
            const userCollection = db().collection('user');
            const user = await userCollection.findOne({'username' : username});

            if(!user)   //Nếu không có user
            {
              return done(null,false,{message:'Sai tên đăng nhập'});
            }
            const verifyHash = passwordHash.verify(password, user.password);

            if(verifyHash)
            {
              return done(null,user);
            }
            return done(null,false,{message:'Sai mật khẩu'});
          }
      ));

  passport.use(
    'local-signup',
    new LocalStrategy({ passReqToCallback: true }, async function(req, username, password, done) {
      const User = db().collection('user');
      await User.findOne({ 'username': req.body.username }, async function(err, user) {
        if (err) {
          return done(err);
        }
        if (user) {
          return done(null, false, {message:'Tên đăng nhập đã tồn tại!'});
        }

        if (req.body.password.length <= 6) {
          return done(null, false, {
            message: 'Mật khẩu phải trên 6 ký tự!'
          });
        }

        if (req.body.password !== req.body.password2) {
          return done(null, false, {
            message: 'Hai mật khẩu không khớp!'
          });
        }
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(String(req.body.email).toLowerCase())) {
          return done(null, false, {
            message: 'Địa chỉ email không hợp lệ!'
          });
        }
          await User.findOne({ email: req.body.email }, (err, user) => {
          if (err) {
            return done(err);
          } else if (user) {
            return done(null, false, {
              message: 'Địa chỉ email đã tồn tại!'
            });
          }
          else {
              if (req.body.agreeterm !== 'on'){
                  return done(null, false, {
                      message: 'Vui lòng chấp nhận điều khoản để đăng kí'
                  });
              }

              // save the user
              let password_hashed = passwordHash.generate(password);
              User.insertOne({username: req.body.username, password: password_hashed, display_name: "", date_of_birth: "", email: req.body.email, phone: "", avatar: ""});
              User.findOne({ 'username': req.body.username }, function(err, user) {
                  if (err) return done(err);
                  return done(null, user);
              });
          }
        });

      });

    })
  );
};
