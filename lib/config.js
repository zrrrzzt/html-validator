const getData = require('./get-data')

module.exports = async options => {
  const pkg = require('../package.json')
  const userAgent = `${pkg.name} v ${pkg.version}`
  const ignore = options.ignore
  const format = ignore ? 'text' : options.format || 'json'
  const newOptions = {
    uri: 'https://validator.w3.org/nu/',
    headers: Object.assign({}, {
      'User-Agent': userAgent
    }, options.headers),
    qs: {
      out: format
    },
    method: 'GET'
  }

  if (options.validator) {
    newOptions.uri = options.validator
  }

  if (options.url) {
    newOptions.qs.doc = options.url
  }

  if (options.isLocal) {
    try {
      options.data = await getData(options.url)
    } catch (error) {
      throw error
    }
  }

  if (options.data) {
    newOptions.body = options.data
    newOptions.method = 'POST'
    if (!newOptions.headers['Content-Type']) {
      newOptions.headers['Content-Type'] = 'text/html; charset=utf-8'
    }
  }

  return newOptions
}
