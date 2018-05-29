const axios = require('axios')
const validUrl = require('valid-url')
const config = require('./lib/config')
const filterData = require('./lib/filter-data')

module.exports = function (options, callback) {
  return new Promise(function (resolve, reject) {
    if (!options) {
      let error = new Error('Missing required input: options object')
      return callback ? callback(error, null) : reject(error)
    }

    if (!options.url && !options.data) {
      let error = new Error('Missing required params: url or data')
      return callback ? callback(error, null) : reject(error)
    }

    if (options.url && !validUrl.isWebUri(options.url)) {
      let error = new Error('Invalid url')
      return callback ? callback(error, null) : reject(error)
    }

    const axiosConfig = config(options)
    const ignore = options.ignore

    axios(axiosConfig)
      .then(function (response) {
        if (response && response.status !== 200) {
          let error = new Error('Validator returned unexpected statuscode: ' + response.status)
          return callback ? callback(error, null) : reject(error)
        }

        let data = response.data

        if (ignore) {
          data = filterData(data, ignore)
        }

        return callback ? callback(null, data) : resolve(data)
      }).catch(function (error) {
        return callback ? callback(error, null) : reject(error)
      })
  })
}
