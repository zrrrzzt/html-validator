const axios = require('axios').default
const config = require('./config')
const filterData = require('./filter-data')

async function w3cValidator (options) {
  const requestOptions = await config(options)
  const ignore = options.ignore
  return new Promise((resolve, reject) => {
    axios(requestOptions).then(response => {
      const { data, status } = response
      if (data && status !== 200) {
        const error = new Error('Validator returned unexpected statuscode: ' + status)
        return reject(error)
      }
      return ignore ? resolve(filterData(data, ignore)) : resolve(data)
    }).catch(error => {
      // To match the previous API
      const statusCode = error.message.replace(/^\D+/g, '')
      if (statusCode.length === 3) {
        return reject(new Error('Validator returned unexpected statuscode: ' + statusCode))
      }
      return reject(error)
    })
  })
}

module.exports = w3cValidator
