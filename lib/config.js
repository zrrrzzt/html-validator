const getData = require('./get-data')
const createDocument = require('./create-document-from-fragment')

const setUserAgent = (headers = {}) => {
  // Removes user-agent if environment is browser
  const { name, version } = require('../package.json')
  const isBrowser = typeof window !== 'undefined' && typeof window.document !== 'undefined'
  const isNode = typeof process !== 'undefined' && process.versions != null && process.versions.node != null
  const userAgent = `${name} v ${version}`
  const keys = Object.keys(headers).map(key => key.toLowerCase())
  const hasUserAgent = keys.includes('user-agent')
  return isBrowser && !isNode ? {} : hasUserAgent ? {} : { 'user-agent': userAgent }
}

module.exports = async options => {
  const ignore = options.ignore
  const format = ignore ? 'text' : options.format || 'json'
  const newOptions = {
    url: 'https://validator.w3.org/nu/',
    headers: Object.assign({}, setUserAgent(options.headers), options.headers),
    params: {
      out: format
    },
    method: 'get'
  }

  if (options.validator) {
    newOptions.url = options.validator
  }

  if (options.url) {
    newOptions.params.doc = options.url
  }

  if (options.isLocal) {
    options.data = await getData(options.url)
  }

  if (options.data) {
    newOptions.data = options.isFragment ? createDocument(options.data) : options.data
    newOptions.method = 'post'
    if (!newOptions.headers['Content-Type']) {
      newOptions.headers['Content-Type'] = 'text/html; charset=utf-8'
    }
  }

  return newOptions
}
