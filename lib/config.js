module.exports = function (options) {
  const pkg = require('../package.json')
  const userAgent = `${pkg.name} v ${pkg.version}`
  const ignore = options.ignore
  const format = ignore ? 'text' : options.format || 'json'
  let newOpts = {
    url: 'https://validator.w3.org/nu/',
    headers: {
      'User-Agent': userAgent
    },
    params: {
      out: format
    },
    method: 'get'
  }

  if (options.validator) {
    newOpts.url = options.validator
  }

  if (options.url) {
    newOpts.params.doc = options.url
  }

  if (options.data) {
    newOpts.data = options.data
    newOpts.method = 'post'
    newOpts.headers = {
      'Content-Type': 'text/html; charset=utf-8',
      'User-Agent': userAgent
    }
  }

  return newOpts
}
