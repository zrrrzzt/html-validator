'use strict'

module.exports = (options) => {
  const pkg = require('../package.json')
  const userAgent = `${pkg.name} v ${pkg.version}`
  const ignore = options.ignore
  const format = ignore ? 'text' : options.format || 'json'
  let newOpts = {
    uri: 'http://validator.w3.org/nu/',
    headers: {
      'User-Agent': userAgent
    },
    qs: {
      out: format
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
