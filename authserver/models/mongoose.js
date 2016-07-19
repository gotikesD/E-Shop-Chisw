/**
 * Created by user on 06.03.16.
 */
'use strict';

const mongoose = require('mongoose'),
    config = require('../config');

mongoose.connect(config.mongoose.uri, config.mongoose.options);

module.exports = mongoose;