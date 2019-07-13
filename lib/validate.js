const request = require('request')
const config = require('./config')
const filterData = require('./filter-data')

module.exports = async options => {
  const requestOptions = await config(options)
  const ignore = options.ignore
  return new Promise((resolve, reject) => {
    request(requestOptions, function (error, response, result) {
      if (error) {
        return reject(error)
      }

      if (response && response.statusCode !== 200) {
        const error = new Error('Validator returned unexpected statuscode: ' + response.statusCode)
        return reject(error)
      }

      let data = options.format === 'json' && !ignore ? JSON.parse(result) : result

      if (ignore) {
        data = filterData(data, ignore)
      }
      return resolve(data)
    })
  })
}
