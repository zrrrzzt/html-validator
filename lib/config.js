const getData = require('./get-data')
const createDocument = require('./create-document-from-fragment')

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
    options.data = await getData(options.url)
  }

  if (options.data) {
    newOptions.body = options.isFragment ? createDocument(options.data) : options.data
    newOptions.method = 'POST'
    if (!newOptions.headers['Content-Type']) {
      newOptions.headers['Content-Type'] = 'text/html; charset=utf-8'
    }
  }

  return newOptions
}
