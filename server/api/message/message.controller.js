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
        src: '/assets/images/washing_up_liquid.jpg',
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
        src: '/assets/images/detergent.jpg',
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
        src: '/assets/images/detergent_large.jpg',
        quantity: 0
      }],
      detail: '40 loads',
      actions: ['yes', 'no']
    }, {
      from: 'addit',
      concern: 'confirmation',
      text: 'Got it',
      items: [{
        name: 'shampoo',
        src: '/assets/images/softner.jpg',
        quantity: 0
      }],
      detail: '40 loads',
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
        src: '/assets/images/softner_0.jpg',
        quantity: 0
      }, {
        name: 'shampoo',
        src: '/assets/images/softner_1.png',
        quantity: 0
      }, {
        name: 'shampoo',
        src: '/assets/images/softner_2.jpg',
        quantity: 0
      }]
    }, {
      from: 'addit',
      concern: 'multi-choice',
      text: 'Which ones?',
      items: [{
        name: 'shower gel',
        src: '/assets/images/shampoo.jpg',
        quantity: 0
      }, {
        name: 'toothpaste',
        src: '/assets/images/toothpaste.jpg',
        quantity: 0
      }, {
        name: 'deodorant',
        src: '/assets/images/deodorant.jpg',
        quantity: 0
      }, {
        name: 'shaving foam',
        src: '/assets/images/shaving_gel.jpg',
        quantity: 0
      }]
    }, {
      from: 'addit',
      concern: 'multi-choice',
      text: 'OK these are all 100ml',
      items: [{
        name: 'shower gel',
        src: '/assets/images/shampoo_small.png',
        quantity: 0
      }, {
        name: 'toothpaste',
        src: '/assets/images/toothpaste_small.jpg',
        quantity: 0
      }, {
        name: 'deodorant',
        src: '/assets/images/deodorant_small.jpg',
        quantity: 0
      }, {
        name: 'shaving foam',
        src: '/assets/images/shaving_gel_small.jpg',
        quantity: 0
      }]
    }, {
      from: 'addit',
      concern: 'confirmation',
      text: 'You\'ve got Persil washing up liquid and detergent, Comfort fabric softener and travel size shower gel and toothpaste.',
      actions: [{
        cta: 'buy now',
        confirmation: 'One moment please :)'
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
