'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ItemSchema = new Schema({
  name: String,
  img: String,
  section: String,
});

module.exports = mongoose.model('Item', ItemSchema);
