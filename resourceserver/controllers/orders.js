"use strict";
var Order = require('../models/order')
var StatusError = require('status-errors');
var util = require('util')

var orderRoute = {

    insertOrderIntoDB: (req, res, next) => {
        let newOrder = new Order(req.body);

        return newOrder
            .save()
            .then(data=> {
                if (!data) {
                    return new StatusError(500);
                }
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.setHeader('withCredentials', true);
                res.json('Order saved');
            })
            .catch(next);
    } ,

    getOwnOrder: (req, res, next) => {
        let userEmail = req.params.email;
        Order.find({ 'email': userEmail  })
            .then((data) => {
                if (!data) {
                    next(new StatusError(400, 'Type correct product id'));
                }
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.setHeader('withCredentials', true);
                res.json(data);
            })
            .catch(next);
    }
};

module.exports = orderRoute;