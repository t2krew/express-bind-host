'use strict';

const assert = require('assert');
const express = require('express');
const bodyParser = require('body-parser');
var request = require('supertest');

const bindHost = require('../');


describe('bindHost() without option hosts', function() {
  it('should throw an error', function() {
    var app = express();
    app.listen(3000);
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
    var app = express();
    app.listen(3001);
    app.use(bindHost({
      hosts : '127.0.0.1:3001'
    }));
    app.use(function(req, res, next) {
      res.send('ok');
    })
  });
  

  it('it\'s reponse should be 403', function(done) {
    request('http://localhost:3001')
      .get('/')
      .expect(403)
      .end(done);
  });
});

describe('pass option waring && use unavailable host', function() {
  before(function() {
    var app = express();
    app.listen(3002);
    app.use(bindHost({
      hosts : '127.0.0.1:3002',
      warning : '该域名未绑定！'
    }));
    app.use(bodyParser.urlencoded({
      extended: true
    }));
    app.use(bodyParser.json());
    app.use(function(req, res, next) {
      res.send('ok');
    })
  });

  it('it\'s reponse should be 403', function(done) {
    request('http://localhost:3002')
      .get('/')
      .expect(403)
      .end(function(err, res) {
        if (res.text === '该域名未绑定！') {
          done();
        }
      });
  })
})

describe('use unavailable host', function() {
  before(function() {
    var app = express();
    app.listen(3003);
    app.use(bindHost({
      hosts : '127.0.0.1:3003',
      warning : '该域名未绑定！'
    }));
    app.use(bodyParser.urlencoded({
      extended: true
    }));
    app.use(bodyParser.json());
    app.use(function(req, res, next) {
      res.send('ok');
    })
  });

  it('it\'s reponse text shoule be `ok`', function(done) {
    request('http://127.0.0.1:3003')
      .get('/')
      .expect(200)
      .end(function(err, res) {
        if (res.text === 'ok') {
          done();
        }
      });
  })
})