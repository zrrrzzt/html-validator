module.exports = function (options) {
  const pkg = require('../package.json')
  const userAgent = `${pkg.name} v ${pkg.version}`
  const ignore = options.ignore
  const format = ignore ? 'text' : options.format || 'json'
  const newOpts = {
    uri: 'https://validator.w3.org/nu/',
    headers: Object.assign({
      'User-Agent': userAgent
    }, options.headers),
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
    if (!newOpts.headers['Content-Type']) {
      newOpts.headers['Content-Type'] = 'text/html; charset=utf-8'
    }
  }

  return newOpts
}
