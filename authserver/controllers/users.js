'use strict';
const User = require('../models/user'),
    querystring = require('querystring'),
    mongoose = require('mongoose'),
    _ = require('lodash'),
    StatusError = require('status-errors'),
    bcrypt = require('bcrypt');

module.exports = {

    getUser: function (req, res, next) {
        const SEARCH_REGEX = /\/\?/;
        let parameterString = req.url.replace(SEARCH_REGEX, '');
        let searchId = querystring.parse(parameterString);
        let objectIdFormat = mongoose.Types.ObjectId(searchId.id);

        return User.findById(objectIdFormat)
            .then(data=> {
                if (!data) {
                    console.log(data);
                    return new StatusError(404);
                }
                console.log(data);
                res.send(data);
                next();
            })
            .catch(next);
    },

    createUser: function (req, res, next) {

        let newUser = new User(req.body);
        return newUser
            .save()
            .then(data=> {
                if (!data) {
                    return new StatusError(500);
                }
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.setHeader('withCredentials', true);
                res.json(data);
            })
            .catch(next);
    },

    updateUser: function (req, res, next) {
        let conditions = {_id: req.body._id}
            , update = {$set: updateBody(req.body)}
                , options = {safe: true, upsert: true};

        return User
            .update(conditions, update, options)
            .then(data=> {
                if (!data) {
                    console.log(data);
                    return new StatusError(404, "Cannot find user for update");
                }
                console.log(data);
                res.send(data);
            })
            .catch((err) => {
                console.log(err);
                next(err)
            });
    }
};

function updateBody(body) {
    let result = {};
    body = _.omit(body, '_id');

    _.forIn(body, (value, key)=> {
        if (Array.isArray(value)) {
            for (let i = 0; i < value.length; i++) {
                result[key + '.' + i] = value[i];
            }
        } else if (!Array.isArray(value) && _.isObject(value)) {
            _.forIn(value, (innerValue, innerKey)=> {
                result[key + '.' + innerKey] = innerValue;
            })
        } else {
            result[key] = value;
        }
    });
    if (result.password) {
        result.password = setPassword(result.password);
    }
    return result;
}

function setPassword(value) {
    const SALT_WORK_FACTOR = 10;

    let salt = bcrypt.genSaltSync(SALT_WORK_FACTOR);
    return bcrypt.hashSync(value, salt);
}