/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Item = require('../api/item/item.model');
var User = require('../api/user/user.model');

Item.find({}).removeAsync()
  .then(function() {
    Item.create({
      name: 'PG Tips (60 Bags)',
      img: 'https://s3-eu-west-1.amazonaws.com/turkishlots/20150912_162010.jpg'
    });
  });

User.find({}).removeAsync()
  .then(function() {
    User.createAsync({
      provider: 'local',
      name: 'Test User',
      email: 'test@test.com',
      password: 'test'
    }, {
      provider: 'local',
      role: 'admin',
      name: 'Admin',
      email: 'admin@admin.com',
      password: 'admin'
    })
    .then(function() {
      console.log('finished populating users');
    });
  });
