const validUrl = require('valid-url')
const validate = require('./lib/validate')

module.exports = async options => {
  if (!options) {
    throw new Error('Missing required input: options object')
  }

  if (!options.url && !options.data) {
    throw new Error('Missing required params: url or data')
  }

  if (options.url && !validUrl.isWebUri(options.url)) {
    throw new Error('Invalid url')
  }

  return validate(options)
}
