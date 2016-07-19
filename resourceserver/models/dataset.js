/**
 * Created by user on 31.03.16.
 */
'use strict';

const Product = require('./product');

let prodArray = [
    new Product.topic({
        title: "Electr"
    }),
    new Product.topic({
        title: "Phone"
    }),
    new Product.topic({
        title: "Charger"
    }),
    new Product.topic({
        title: "Modern"
    }),
    new Product.topic({
        title: "Stuff"
    }),
    new Product.topic({
        title: "Laptop"
    }),
    new Product.product({
        title: "Meizu",
        url: "http://somt.com",
        descriptorField: ["Good"],
        price: 166,
        topics: ["Phone", "Stuff"]
    }),
    new Product.product({
        title: "Samsung",
        url: "http://somt.com",
        descriptorField: ["Bad", "Two"],
        price: 166,
        topics: ["Electr", "Stuff"]
    }),
    new Product.product({
        title: "Device",
        url: "http://somtsfsdfsdfsdfsd.sgscom",
        descriptorField: ["Gogergerod", "onrgeree"],
        price: 166,
        topics: ["Charger", "Modern"]
    }),
    new Product.product({
        title: "Heizu",
        url: "http://somt.com",
        descriptorField: ["Old"],
        price: 166,
        topics: ["Charger"]
    }),
    new Product.product({
        title: "HTC",
        url: "http://somt.com",
        descriptorField: ["Good", "one"],
        price: 166,
        topics: ["Laptop"]
    })
];

module.exports = function(){
    prodArray.forEach(prod=>{
        prod.save(err=>{
            console.log(err);
        });
    });
};