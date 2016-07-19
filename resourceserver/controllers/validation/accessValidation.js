/**
 * Created by user on 30.03.16.
 */
'use strict';

const request = require('request'),
    StatusError = require('status-errors');

module.exports = {
    hasAccess: function (req, res, next) {
        checkAccess(req.headers.authorization)
        .then(status=>{
            if(status == 404) {
                next(new StatusError(404, 'User not found'));
            } else if(status == 200){
                next();
            }
        })
        .catch(err=>{
            console.log(err);
            next(err);
        });
    }
};

function checkAccess(bearerToken) {
    return new Promise((resolve, reject)=> {
        request({
            uri: 'http://localhost:3000/auth/authorized',
            method: "GET",
            headers: {
                'authorization': bearerToken
            },
            timeout: 10000,
            followRedirect: true,
            maxRedirects: 10
        }, function (error, response, body) {
            if (!error && response.statusCode) {
                console.log(response.statusCode)
                resolve(response.statusCode);
            } else {
                reject(error);
            }
        });
    });
}