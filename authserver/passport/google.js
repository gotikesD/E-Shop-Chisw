"use strict";

var passport = require('passport')
var GoogleStrategy = require( 'passport-google-oauth2' ).Strategy,
    User = require('../models/user'),
    config = require('../config'),
    jwt = require('jsonwebtoken')


passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(obj, done) {
    done(null, obj);
});

passport.use(new GoogleStrategy({
        clientID:     '588667797186-4ektui56p8f66qmlsdc9vkepcptmv8f8.apps.googleusercontent.com',
        clientSecret: 'ps-8UNTP9qblJTEXaLrMKFYF',
        callbackURL: "http://localhost:3000/auth/google/callback",
        passReqToCallback   : true
    },
    function(request, accessToken, refreshToken, profile, done) {
        var email = profile.email;
        User.findOne({email : email}, function(err, oldUser) {
            if(oldUser) {
                console.log('I am already here!');
                done(null, oldUser);
            } else {
                console.log('I am a new user');
                let firstName = profile.displayName.split(' ')[0];
                let lastName = profile.displayName.split(' ')[1];
                var newUser = new User();
                newUser.firstName = 'googleUser';
                newUser.lastName = 'googleUser';
                newUser.email =  email;

                newUser.save(function(err) {
                    if(err) { throw err; }
                    console.log(newUser);
                    done(null, newUser);
                });

                let token = jwt.sign(newUser, config.secret, {
                    expiresIn: 60 * 60 * 24
                });

                let date = new Date();
                date.setSeconds(date.getSeconds() + 60 * 60 * 24);
                let tokenObj = {
                    value: token,
                    expDate: date
                };

                newUser.token = tokenObj;
                newUser.save();
            }
        })
    }
));

module.exports = {
    firstStep : passport.authenticate('google', { scope: [  'https://www.googleapis.com/auth/plus.login',
        'https://www.googleapis.com/auth/plus.profile.emails.read']}),

    secondStep :  passport.authenticate('google', {
        successRedirect: '/auth/google/success',
        failureRedirect: '/auth/google/error'
    })
};




