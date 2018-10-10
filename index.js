const request = require('request')
const validUrl = require('valid-url')
const config = require('./lib/config')
const filterData = require('./lib/filter-data')

module.exports = function (options, callback) {
  return new Promise(function (resolve, reject) {
    if (!options) {
      const error = new Error('Missing required input: options object')
      return callback ? callback(error, null) : reject(error)
    }

    if (!options.url && !options.data) {
      const error = new Error('Missing required params: url or data')
      return callback ? callback(error, null) : reject(error)
    }

    if (options.url && !validUrl.isWebUri(options.url)) {
      const error = new Error('Invalid url')
      return callback ? callback(error, null) : reject(error)
    }

    const reqOpts = config(options)
    const ignore = options.ignore

    request(reqOpts, function (error, response, result) {
      if (error) {
        return callback ? callback(error, null) : reject(error)
      }

      if (response && response.statusCode !== 200) {
        const error = new Error('Validator returned unexpected statuscode: ' + response.statusCode)
        return callback ? callback(error, null) : reject(error)
      }

      let data = options.format === 'json' && !ignore ? JSON.parse(result) : result

      if (ignore) {
        data = filterData(data, ignore)
      }

      return callback ? callback(null, data) : resolve(data)
    })
  })
}
