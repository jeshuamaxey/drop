'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');

describe('GET /api/messages', function() {

  it('should respond with JSON array', function(done) {
    request(app)
      .get('/api/messages')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Array);
        done();
      });
  });

  it('should respond respond to tea', function(done) {
    request(app)
      .post('/api/messages')
      .send({
        text: 'give me some tea'
      })
      .expect(201)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        console.log(res.body);
        res.body.action.should.exist;
        res.body.text.should.exist;
        done();
      });
  });
});
