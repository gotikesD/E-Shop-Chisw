var Joi = require('joi');


module.exports = {

  login :   function (req, res, next) {


      var productJoi = {
          email: Joi.string().email(),
          password: Joi.string().min(6).max(10)
      };

      Joi.validate({email: req.body.email, password: req.body.password}, productJoi, (err, userInfo) => {
          err ? next(err) : next();
      })
  },

  patch :   function (req, res, next) {

        var productJoi = {
            email: Joi.string()
        };

        Joi.validate({email: req.body.email}, productJoi, (err, userInfo) => {
            err ? next(err) : next();
        })
  },

  register : function (req, res, next) {
      var productJoi = {
          firstName: Joi.string().min(3).max(20).required(),
          lastName: Joi.string().min(3).max(20).required(),
          email: Joi.string().email().required(),
          password: Joi.string().min(6).max(10).required()
      };

      Joi.validate(
          { lastName : req.body.lastName,
            firstName : req.body.firstName,
            email: req.body.email,
            password: req.body.password}, productJoi, (err, userInfo) => {
            err ? next(err) : next();
      })

  }
};