'use strict'

var tap = require('tap')
var setupOptions = require('../lib/setupOptions')

tap.test('setupOptions returns expected object as default', function (test) {
  var options = {}
  var reqOptions = setupOptions(options)

  tap.equal(reqOptions.qs.out, 'json', 'JSON is default format')
  test.done()
})

tap.test('setupOptions returns expected object with inputs', function (test) {
  var options = {
    validator: 'http://html5.validator.nu',
    url: 'https://www.github.com'
  }
  var reqOptions = setupOptions(options)

  tap.equal(reqOptions.qs.doc, options.url, 'Url is correct')
  tap.equal(reqOptions.uri, options.validator, 'Url is correct')
  test.done()
})

tap.test('setupOptions returns expected object with input from data', function (test) {
  var options = {
    data: 'http://html5.validator.nu'
  }
  var reqOptions = setupOptions(options)

  tap.equal(reqOptions.body, options.data, 'Data is correct')
  tap.equal(reqOptions.method, 'POST', 'Method is POST')
  tap.ok(reqOptions.headers, 'Headers are set')
  test.done()
})
