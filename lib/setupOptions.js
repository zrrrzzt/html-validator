'use strict'

function setupOptions (options) {
  var pkg = require('../package.json')
  var userAgent = 'html-validator v' + pkg.version
  var newOpts = {
    uri: 'http://validator.w3.org/nu/',
    headers: {
      'User-Agent': userAgent
    },
    qs: {
      out: options.format || 'json'
    },
    method: 'GET'
  }

  if (options.validator) {
    newOpts.uri = options.validator
  }

  if (options.url) {
    newOpts.qs.doc = options.url
  }

  if (options.data) {
    newOpts.body = options.data
    newOpts.method = 'POST'
    newOpts.headers = {
      'Content-Type': 'text/html; charset=utf-8',
      'User-Agent': userAgent
    }
  }

  return newOpts
}

module.exports = setupOptions
