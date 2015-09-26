'use strict'

var tap = require('tap')
var fs = require('fs')
var validator = require('../index')

tap.test('Requires options to be specified', function (test) {
  var options = false
  var expectedErrorMessage = 'Missing required input: options object'
  validator(options, function (error, data) {
    tap.equal(error.message, expectedErrorMessage, expectedErrorMessage)
    test.done()
  })
})

tap.test('Requires options.url or options.data to be specified', function (test) {
  var options = {}
  var expectedErrorMessage = 'Missing required params: url or data'
  validator(options, function (error, data) {
    tap.equal(error.message, expectedErrorMessage, expectedErrorMessage)
    test.done()
  })
})

tap.test('Returns error if invalid validator is specified', function (test) {
  var options = {
    url: 'http://www.github.com',
    validator: 'http://buhu.dennefinnesikkeengangforannetenntest.com'
  }
  validator(options, function (error, data) {
    tap.ok(error, 'Validator not found')
    test.done()
  })
})

tap.test('Requires options.url to be a valid url', function (test) {
  var options = {
    url: 'pysjefanten'
  }
  var expectedErrorMessage = 'Invalid url'
  validator(options, function (error, data) {
    tap.equal(error.message, expectedErrorMessage, expectedErrorMessage)
    test.done()
  })
})

tap.test('Returns error if not status 200 OK', function (test) {
  var options = {
    url: 'https://www.github.com',
    format: 'cucumber'
  }
  var expectedErrorMessage = 'Validator returned unexpected statuscode: 400'
  validator(options, function (error, data) {
    tap.equal(error.message, expectedErrorMessage, expectedErrorMessage)
    test.done()
  })
})

tap.test('Should get 0 error messages from valid.html', function (test) {
  var options = {
    format: 'json',
    data: fs.readFileSync('test/data/valid.html')
  }
  validator(options, function (error, data) {
    if (error) {
      throw error
    }
    var errors = 0
    data.messages.forEach(function (msg) {
      if (msg.type === 'error') {
        errors++
      }
    })

    tap.equal(errors, 0, 'html is valid')
    test.done()
  })
})

tap.test('Should get 1 error message from invalid.html', function (test) {
  var options = {
    format: 'json',
    data: fs.readFileSync('test/data/invalid.html')
  }
  validator(options, function (error, data) {
    if (error) {
      throw error
    }
    var errors = 0
    data.messages.forEach(function (msg) {
      if (msg.type === 'error') {
        errors++
      }
    })

    tap.equal(errors, 1, 'html is invalid')
    test.done()
  })
})
