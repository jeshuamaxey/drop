'use strict';

var _ = require('lodash');
var Message = require('./message.model');
var Item = require('../item/item.model');

// Get list of messages
exports.index = function(req, res) {
  Message.find(function (err, messages) {
    if(err) { return handleError(res, err); }
    return res.json(200, messages);
  });
};

// Get a single message
exports.show = function(req, res) {
  Message.findById(req.params.id, function (err, message) {
    if(err) { return handleError(res, err); }
    if(!message) { return res.send(404); }
    return res.json(message);
  });
};

// Creates a new message in the DB.
exports.create = function(req, res) {
  var message = req.body;
  Message.create(req.body, function(err, message) {
    if(err) { return handleError(res, err); }
    var response = {
      from: 'addit',
      text: 'Sorry, I don\'t understand what you mean!'
    }
    if (message.text.toLowerCase().indexOf('tea') > -1) {
      Item.find({section: 'tea'}).exec()
      .then(function(items) {
        response.text = 'Here you go!',
        response.action = {
          items: items,
          concern: 'add'
        }
        Message.create(
          response, 
          function(err, r) {
            return res.json(201, r);
          }
        )
      })
    } else if (message.text.toLowerCase().indexOf('holiday') > -1) {
      Item.findOne({section: 'holiday'}).exec()
      .then(function(item) {
        var response = _.merge(response, {
          text: 'Have a nice trip Jesh!',
          action: {
            items: [item],
            concern: 'add'
          }
        });
        Message.create(
          response, 
          function(err, r) {
            return res.json(201, r);
          }
        )
      })
    } else {
      Message.create(
        response, 
        function(err, response) {
          return res.json(201, response);
        }
      )
    }
  });
};

// Updates an existing message in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Message.findById(req.params.id, function (err, message) {
    if (err) { return handleError(res, err); }
    if(!message) { return res.send(404); }
    var updated = _.merge(message, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, message);
    });
  });
};

// Deletes a message from the DB.
exports.destroy = function(req, res) {
  Message.findById(req.params.id, function (err, message) {
    if(err) { return handleError(res, err); }
    if(!message) { return res.send(404); }
    message.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
