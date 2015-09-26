'use strict'

function validator (options, callback) {
  var request = require('request')
  var validUrl = require('valid-url')
  var setupOptions = require('./lib/setupOptions')

  if (!options) {
    return callback(new Error('Missing required input: options object'), null)
  }

  if (!options.url && !options.data) {
    return callback(new Error('Missing required params: url or data'), null)
  }

  if (options.url && !validUrl.isWebUri(options.url)) {
    return callback(new Error('Invalid url'), null)
  }

  var reqOpts = setupOptions(options)
  request(reqOpts, function (error, response, result) {
    if (error) {
      return callback(error, null)
    }

    if (response && response.statusCode !== 200) {
      return callback(new Error('Validator returned unexpected statuscode: ' + response.statusCode), null)
    }

    var data = options.format === 'json' ? JSON.parse(result) : result

    return callback(null, data)
  })
}

module.exports = validator
