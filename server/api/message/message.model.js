'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var MessageSchema = new Schema({
  from: String,
  text: String,
  action: {
    concern: String,
    items: [{
      type: ObjectId,
      ref: 'Item'
    }]
  },
  created: {
    type: 'Date',
    default: Date.now
  }
});

module.exports = mongoose.model('Message', MessageSchema);
