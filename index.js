'use strict'

const request = require('request')
const validUrl = require('valid-url')
const setupOptions = require('./lib/setup-options')

module.exports = (options, callback) => {
  return new Promise((resolve, reject) => {
    if (!options) {
      let error = new Error('Missing required input: options object')
      if (callback) {
        return callback(error, null)
      }
      reject(error)
    }

    if (!options.url && !options.data) {
      let error = new Error('Missing required params: url or data')
      if (callback) {
        return callback(error, null)
      }
      reject(error)
    }

    if (options.url && !validUrl.isWebUri(options.url)) {
      let error = new Error('Invalid url')
      if (callback) {
        return callback(error, null)
      }
      reject(error)
    }

    const reqOpts = setupOptions(options)

    request(reqOpts, (error, response, result) => {
      if (error) {
        if (callback) {
          return callback(error, null)
        }
        reject(error)
      }

      if (response && response.statusCode !== 200) {
        let error = new Error('Validator returned unexpected statuscode: ' + response.statusCode)
        if (callback) {
          return callback(error, null)
        }
        reject(error)
      }

      const data = options.format === 'json' ? JSON.parse(result) : result

      if (callback) {
        return callback(null, data)
      }
      resolve(data)
    })
  })
}
