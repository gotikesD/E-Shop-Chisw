
const passport = require('passport'),
    BearerStrategy = require('passport-http-bearer').Strategy,
    User = require('../models/user'),
    config = require('../config'),
    StatusError = require('status-errors');

passport.use(new BearerStrategy(function (token, done) {

        User.findOne({"token.value": token})
            .then(user=> {
                if (!user) {
                    return done(new StatusError(404, "User not found"));
                }
                if(user.token.expDate < new Date()){
                    return done(null, false, new StatusError(401, "Your token was expired"));
                }
                console.log(user);
                return done(null, user, {scope: 'all'});
            })
            .catch(done);
}));

module.exports = passport;