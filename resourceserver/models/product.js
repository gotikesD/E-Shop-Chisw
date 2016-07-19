var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductSchema = Schema({

    title: {
        type: String,
        required: true,
        index: true
    },
    url: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
        index: true
    },
    price: {
        type: Number,
        required: true,
        index: true
    },
    mainCategory: {
        type: String,
        required: true,
        index: true
    },
    subCategories: [{
        type: String
    }],
    created_at: {
        type: Date,
        required: true,
        default: new Date
    },
    lastWatched: Date,
    imgSrc: String

});

var TopicSchema = Schema({

    title: {
        type: String,
        required: true,
        unique: true
    },
    parent: {
      type: Schema.Types.ObjectId,
      ref: 'Topic'
    },
    tree: [Schema.Types.ObjectId]

});

var Product = mongoose.model('Product', ProductSchema);
var Topic = mongoose.model('Topic', TopicSchema);

module.exports = {
    product: Product,
    topic: Topic
};