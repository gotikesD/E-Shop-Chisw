var Joi = require('joi')


module.exports = {

    post :   function (req, res, next) {

        var productJoi = {
            title: Joi.string().required().min(3).max(50),
            price: Joi.number().required().min(3),
            url : Joi.string().required().uri(),
            //topic: Joi.string().required().min(3).max(50),
            //subgroup : Joi.string().required().min(3).max(50)
        };

        Joi.validate({
            title: req.body.title,
            price: req.body.price,
            url: req.body.url,
            //topic: req.body.topic,
            //subgroup: req.body.subgroup
        }, productJoi, (err, userInfo) => {
            err ? next(new Error(err)) : next();
        })
    } ,

    patch :   function (req, res, next) {

        var productJoi = {
            title: Joi.string(),
            price: Joi.number(),
            url : Joi.string().uri(),
            topic: Joi.string(),
            subgroup : Joi.string()
        };

        Joi.validate({
            title: req.body.title,
            price: req.body.price,
            url: req.body.url,
            topic: req.body.topic,
            subgroup: req.body.subgroup
        }, productJoi, (err, userInfo) => {
            err ? next(new Error(err)) : next();
        })
    } ,

    delete : function (req,res,next) {
        var productJoi = {
            _id : Joi.string().min(24).max(24)
        }

        Joi.validate({
            _id: req.params.id ,
        }, productJoi, (err, userInfo) => {
            err ? next(new Error(err)) : next();
        })
    },

    search : function (req,res,next) {
        var productJoi = {
            title: Joi.string().required().min(3).max(50),
            priceFrom : Joi.number(),
            priceTo : Joi.number()
        }

        Joi.validate({
            title: req.body.title ,
            priceFrom: req.body.priceFrom,
            priceTo: req.body.priceTo
        }, productJoi, (err, userInfo) => {
            err ? next(new Error(err)) : next();
        })
    }
}