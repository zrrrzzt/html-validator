var tap = require('tap')
var config = require('../../lib/config')

tap.test('config returns expected object as default', function (test) {
  var options = {}
  var reqOptions = config(options)

  tap.equal(reqOptions.qs.out, 'json', 'JSON is default format')
  test.done()
})

tap.test('config returns expected object with inputs', function (test) {
  var options = {
    validator: 'http://html5.validator.nu',
    url: 'https://www.github.com'
  }
  var reqOptions = config(options)

  tap.equal(reqOptions.qs.doc, options.url, 'Uri is correct')
  tap.equal(reqOptions.uri, options.validator, 'Uri is correct')
  test.done()
})

tap.test('config returns expected object with input from data', function (test) {
  var options = {
    data: 'http://html5.validator.nu'
  }
  var reqOptions = config(options)

  tap.equal(reqOptions.body, options.data, 'Data is correct')
  tap.equal(reqOptions.method, 'POST', 'Method is POST')
  tap.ok(reqOptions.headers, 'Headers are set')
  test.done()
})
