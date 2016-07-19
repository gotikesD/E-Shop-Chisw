/**
 * Created by user on 22.03.16.
 */
'use strict';
const User = require('../models/user'),
    jwt = require('jsonwebtoken'),
    config = require('../config'),
    StatusError = require('status-errors');

module.exports = {


    login: function (req, res, next) {
            console.log(req.body);
            console.log('here')
            User.findOne({email: req.body.email})
            .then(user=> {
                if (!user) {
                    return next(new StatusError(404, "User not found"));
                } else {
                    return checkPassword(req.body.password, user);
                }
            })
            .then(userFlag=> {
                if (!userFlag.flag) {
                    return next(new StatusError(401, "Wrong password"));
                } else {

                    userFlag.user.token = null;
                    userFlag.user.save();

                    let token = jwt.sign(userFlag.user, config.secret, {
                        expiresIn: 60 * 60 * 24 // expires in 1 hour
                    });
                    let date = new Date();
                    date.setSeconds(date.getSeconds() + 60 * 60 * 24);
                    let tokenObj = {
                        value: token,
                        expDate: date
                    };

                        userFlag.user.token = tokenObj;
                        userFlag.user.save();
                        res.setHeader('Access-Control-Allow-Origin', '*');
                        res.send({access_token: token});

                }
            })
            .catch(next);
    },
// will be implemented later
    logout: function (req, res, body) {
        console.log(req);
    },

    hasAccess: function (req, res) {
        if(req.user) {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.sendStatus(204);
        } else {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.sendStatus(404);
        }
    }
};

function checkPassword(password, user) {
    return new Promise((resolve, reject)=> {
        if (user) {
            user.comparePassword(password, function (err, isMatch) {
                if (err) {
                    reject(err);
                } else {
                    let userFlag = {user: user, flag: isMatch};
                    resolve(userFlag);
                }
            });
        }
    });
}