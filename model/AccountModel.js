const {db} = require('../database/db');
const { ObjectId} = require('mongodb');
const passport = require('passport');
const passwordHash = require('password-hash');
const { Passport } = require('passport');
var generator = require('generate-password');
const nodemailer = require('nodemailer');

exports.CreateUserAccount = async(user) => {
    const userDatabase = db().collection('user');
    await userDatabase.insert({username: user.username, password: user.password, display_name: username.display_name, date_of_birth: user.date_of_birth, email: user.email, phone: user.phone, avatar: user.avatar});
    return true;
}