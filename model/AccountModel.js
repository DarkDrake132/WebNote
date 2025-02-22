const {db} = require('../database/db');
// const { ObjectId} = require('mongodb');
// const passport = require('passport');
const passwordHash = require('password-hash');
// const { Passport } = require('passport');
// var generator = require('generate-password');
// const nodemailer = require('nodemailer');

exports.CreateUserAccount = async (username, email, password_hashed) => {
    const userDatabase = db().collection('user');
    await userDatabase.insert({username: username, password: password_hashed, display_name: "", date_of_birth: "", email: email, phone: "", avatar: ""});
    return 1;
}

exports.updateEmailPhoneAndImage = async (user) => {
    const userCollection = db().collection("user");
    await userCollection.updateOne({_id: user._id}, {$set: {email: user.email, phone: user.phone, avatar: user.avatar}});
    return 1;
}