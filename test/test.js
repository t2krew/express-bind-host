'use strict';

const assert = require('assert');
const express = require('express');
var request = require('supertest');

const bindHost = require('../');

var app = express();

describe('bindHost() without option hosts', function() {
  it('should throw an error', function() {
    assert.throws(
      () => {
        app.use(bindHost());
      },
      (err) => {
        if (err instanceof Error && /option must contain hosts/.test(err)) {
          return true;
        }
      },
      'unexpected error'
    )
  });
});


describe('not pass option waring && use unavailable host', function() {
  before(function() {
    app.use(bindHost({
      hosts : '127.0.0.1:3000'
    }));
    app.use(function(req, res, next) {
      res.send('ok');
    })
    app.listen(3000);
  });

  it('should reponse', function(done) {
    request('http://localhost:3000')
      .get('/')
      .expect(403)
      .end(done);
  })
})