'use strict';
var assert = require('assert')
  , fs = require('fs')
  , validator = require('./../index');

describe('validator', function () {

  it('Should require opts.format', function (done) {
    fs.readFile('test/valid.html', 'utf-8', function(err, html){
      if(err) throw err;

      var opts = {data:html};

      validator(opts, function(error, data){
        assert.throws(function(){
            if(error) throw error;
          });
        done();
      });
    });
  });

  it('Should require opts.data', function (done) {
    fs.readFile('test/valid.html', 'utf-8', function(err, html){
      if(err) throw err;

      var opts = {format:'json'};

      validator(opts, function(error, data){
        assert.throws(function(){
          if(error) throw error;
        });
        done();
      });
    });
  });

  it('Should require opts.url', function (done) {
    fs.readFile('test/valid.html', 'utf-8', function(err, html){
      if(err) throw err;

      var opts = {format:'json'};

      validator(opts, function(error, data){
        assert.throws(function(){
          if(error) throw error;
        });
        done();
      });
    });
  });

  it('Should get 0 messages from valid html', function (done) {
    fs.readFile('test/valid.html', 'utf-8', function(err, html){
      if(err) throw err;

      var opts = {format:'json', data:html}

      validator(opts, function(error, data){
        if(error) throw error;
        assert.equal(0, data.messages.length);
        done();
      });
    });
  });

  it('Should get 1 message from invalid html', function (done) {
    fs.readFile('test/invalid.html', 'utf-8', function(err, html){
      if(err) throw err;

      var opts = {format:'json', data:html}

      validator(opts, function(error, data){
        if(error) throw error;
        assert.equal(1, data.messages.length);
        done();
      });
    });
  });

});