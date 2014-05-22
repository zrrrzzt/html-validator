'use strict';
var assert = require('assert')
  , fs = require('fs')
  , validator = require('./../index')
  ;

describe('Validator - outputs', function () {

  it('Should get 0 error messages from valid.html', function (done) {
    fs.readFile('test/valid.html', 'utf-8', function(err, html){
      if(err) throw err;

      var opts = {format:'json', data:html}

      validator(opts, function(error, data){
        if(error) throw error;

        var errors = 0;
        data.messages.forEach(function(msg){
          if(msg.type === 'error'){
            errors++;
          }
        });

        assert.equal(0, errors);
        done();
      });
    });
  });

  it('Should get 1 error message from invalid.html', function (done) {
    fs.readFile('test/invalid.html', 'utf-8', function(err, html){
      if(err) throw err;

      var opts = {format:'json', data:html}

      validator(opts, function(error, data){
        if(error) throw error;

        var errors = 0;
        data.messages.forEach(function(msg){
          if(msg.type === 'error'){
            errors++;
          }
        });

        assert.equal(1, errors);
        done();
      });
    });
  });

});