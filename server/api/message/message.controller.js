'use strict';

var _ = require('lodash');
var Message = require('./message.model');
var Item = require('../item/item.model');

var responses =  [{
      from: 'addit',
      concern: 'confirmation',
      text: 'OK. I\'ve added it',
      items: [{
        name: 'shampoo',
        src: 'http://www.placecage.com/c/200/201',
        quantity: 0
      }],
      actions: [{
        cta: 'undo',
        confirmation: 'undone'
      }]
    }, {
      from: 'addit',
      concern: 'confirmation',
      text: 'Sure, it\'s in there',
      items: [{
        name: 'shampoo',
        src: 'http://www.placecage.com/c/200/201',
        quantity: 0
      }],
      actions: [{
        cta: 'undo',
        confirmation: 'undone'
      }]
    }, {
      from: 'addit',
      concern: 'decision',
      text: 'Is this enough?',
      items: [{
        name: 'shampoo',
        src: 'http://www.placecage.com/c/200/201',
        quantity: 0
      }],
      detail: '2L bottle',
      actions: ['yes', 'no']
    }, {
      from: 'addit',
      concern: 'confirmation',
      text: 'Got it',
      items: [{
        name: 'shampoo',
        src: 'http://www.placecage.com/c/200/201',
        quantity: 0
      }],
      detail: '2L bottle',
      actions: [{
        cta: 'undo',
        confirmation: 'undone'
      }]
    }, {
      from: 'addit',
      concern: 'choice',
      text: 'Any of these?',
      items: [{
        name: 'shampoo',
        src: 'http://www.placecage.com/c/200/201',
        quantity: 0
      }, {
        name: 'shampoo',
        src: 'http://www.placecage.com/c/200/201',
        quantity: 0
      }, {
        name: 'shampoo',
        src: 'http://www.placecage.com/c/200/201',
        quantity: 0
      }]
    }, {
      from: 'addit',
      concern: 'multi-choice',
      text: 'Which ones?',
      items: [{
        name: 'shampoo',
        src: 'http://www.placecage.com/c/200/201',
        quantity: 0
      }, {
        name: 'conditioner',
        src: 'http://www.placecage.com/c/201/201',
        quantity: 0
      }, {
        name: 'deodorant',
        src: 'http://www.placecage.com/c/202/201',
        quantity: 0
      }, {
        name: 'shaving foam',
        src: 'http://www.placecage.com/c/204/202',
        quantity: 0
      }]
    }, {
      from: 'addit',
      concern: 'multi-choice',
      text: 'OK these are all 100ml',
      items: [{
        name: 'shampoo',
        src: 'http://www.placecage.com/c/200/201',
        quantity: 0
      }, {
        name: 'conditioner',
        src: 'http://www.placecage.com/c/201/201',
        quantity: 0
      }, {
        name: 'deodorant',
        src: 'http://www.placecage.com/c/202/201',
        quantity: 0
      }, {
        name: 'shaving foam',
        src: 'http://www.placecage.com/c/204/202',
        quantity: 0
      }]
    }];

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


// Fake it till you make it 
// Returns response from given index
exports.response = function(req, res) {
  var message = responses[Number(req.query.id)];
  var delay = Math.floor(Math.random()*500) + 500;
  setTimeout(function() {
    return res.status(200).send(message);
  }, delay);
}

function handleError(res, err) {
  return res.send(500, err);
}
