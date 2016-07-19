'use strict';
var passport = require('passport'),
    FacebookStrategy = require('passport-facebook').Strategy,
    User = require('../models/user'),
    config = require('../config'),
    jwt = require('jsonwebtoken')


passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(obj, done) {
    done(null, obj);
});

passport.use('facebook',new FacebookStrategy({
        clientID: '914348468681625',
        clientSecret: 'bd2cd74e287ae399c64dff0b352a9d72',
        callbackURL: "http://localhost:3000/auth/facebook/callback",
        profileFields: ['displayName', 'emails']

    },
    function(accessToken, refreshToken, profile, done) {
        var email = profile._json.email;

        User.findOne({email : email}, function(err, oldUser) {
            if(oldUser) {
                console.log('I am already here!');
                done(null, oldUser);
            } else {
                console.log('I am a new user');
                let firstName = profile.displayName.split(' ')[0];
                let lastName = profile.displayName.split(' ')[1];
                let email  = profile._json.email;
                var newUser = new User();
                newUser.firstName = firstName;
                newUser.lastName = lastName;
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

    }))



module.exports = {

    firstStep : passport.authenticate('facebook'),

    secondStep:  passport.authenticate('facebook', {
        successRedirect: '/auth/facebook/success',
        failureRedirect: '/auth/facebook/error'
    })
};

