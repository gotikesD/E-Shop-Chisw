"use strict";
var Product = require('../models/product').product;
var Topic = require('../models/product').topic;
var StatusError = require('status-errors');
var util = require('util'),
    dataset = require('../models/dataset'),
    mongoose = require('mongoose');

var itemRoute = {

    getByCategory: (req, res, next) => {
        let query = req.params.category;
        console.log(query)
        Product.find({ 'mainCategory': query  })
            .then((data) => {
                if (!data) {
                    next(new StatusError(400, 'Type correct product id'));
                }
                res.send(JSON.stringify(data, null, 2))
            })
            .catch(next);
    },

    getSidebarTopics: (req, res, next) => {

        Topic.find()
            .then((data) => {
                if (!data) {
                    next(new StatusError(404, 'Not found'));
                }
                res.send(JSON.stringify(data, null, 2))
            })
            .catch(next);
    },

    getTopics: (req, res, next) => {

        Topic.find({parent: req.params.id})
            .then((data) => {
                if (!data) {
                    next(new StatusError(400, 'Type correct topic id'));
                }
                res.send(JSON.stringify(data, null, 2))
            })
            .catch(next);
    },

    getProducts: (req, res, next) => {

        let topId = mongoose.Types.ObjectId(req.params.topicId);

        Topic.find({$or: [{tree: topId}, {_id: topId}]}, {title: 1, _id: 0})
            .then(topics=> {
                let topicArray = [];
                topics.forEach(topic=> {
                    topicArray.push(topic.title);
                });
                return Product.find({topics: {$in: topicArray}})
                    .skip((req.query.page - 1) * req.query.perPage)
                    .limit(Number(req.query.perPage));
            })
            .then(data=> {
                console.log(data);
                res.send(JSON.stringify(data, null, 2))
            })
            .catch(next);

    },

    getProductById: (req, res, next) => {

        Product.findOne({_id: req.params.id})
            .then((data) => {
                if (!data) {
                    next(new StatusError(400, 'Type correct product id'));
                }
                res.send(JSON.stringify(data, null, 2))
            })
            .catch(next);
    },

    searchProduct: (req, res, next) => {
        console.log(req.body)
        Product.find()
            .where('title', new RegExp(req.body.title, 'i'))
            .where('description', new RegExp(req.body.description, 'i'))
            .where('price').gte(req.body.minPrice || 0).lte(req.body.maxPrice || 1000000)
            .select({'images': 0, '__v': 0})
            .skip((req.body.page - 1) * req.body.perPage)
            .limit(Number(req.body.perPage))
            .then((data) => {
                if (!data) {
                    next(new StatusError(400, 'Type correct product params'));
                    next(new StatusError(400, 'Type correct product params'));
                }

                console.log(data)
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.send(JSON.stringify(data, null, 2))
            })
            .catch(next);

    },

    createProduct: (req, res, next) => {

        var newProduct = new Product;
        for (var field in req.body) {
            if (typeof field === 'object') {
                for (var prop in field) {
                    newProduct[field][prop] = req.body[field][prop];
                }
            }
            newProduct[field] = req.body[field];
        }
        newProduct.save((err) => {
            if (err) {
                next(new StatusError(400, "Item already exists"));
                return;
            } else {
                var topics = [];

                if (typeof req.body.topics == 'string') {
                    topics.push(req.body.topics);
                } else {
                    topics = req.body.topics;
                }

                topics.forEach((topic) => {
                    var newTopic = new Topic({
                        title: topic
                    });
                    newTopic.save();
                });
                res.json({success: true, msg: 'Item created successfully'});
            }
        });
    },

    getProductsByPages: (req, res, next) => {

        Product.find()
            .skip((req.query.page - 1) * req.query.perPage)
            .limit(Number(req.query.perPage))
            .then((data) => {
                if (!data) {
                    next(new StatusError(400, 'Type correct product id'));
                }
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.send(JSON.stringify(data, null, 2))
            })
            .catch(next);
    },

    getProductsAmount: (req, res, next) => {
        Product.find()
            .then((data) => {
                if (!data) {
                    next(new StatusError(400, 'Type correct product id'));
                }
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.send({amount: data.length});
            })
            .catch(next);
    },

    getAllProducts: (req, res, next) => {

        Product.find()
            .then((data) => {
                if (!data) {
                    next(new StatusError(400, 'Type correct product id'));
                }
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.send(JSON.stringify(data, null, 2))
            })
            .catch(next);
    },

    getOneProduct: (req, res, next) => {
        Product.findOne({_id: req.params.id})
            .then((data) => {
                if (!data) {
                    next(new StatusError(400, 'Type correct product id'));
                }
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.send(JSON.stringify(data, null, 2))
            })
            .catch(next);
    }
};

module.exports = itemRoute;