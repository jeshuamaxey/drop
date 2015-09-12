'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var MessageSchema = new Schema({
  query: String,
  response: String,
  action: {}
});

module.exports = mongoose.model('Message', MessageSchema);
