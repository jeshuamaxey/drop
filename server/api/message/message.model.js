'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var MessageSchema = new Schema({
  text: String,
  action: {},
  create: {
    type: 'Date',
    default: Date.now
  }
});

module.exports = mongoose.model('Message', MessageSchema);
