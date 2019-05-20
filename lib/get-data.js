const request = require('request')

module.exports = url => {
  return new Promise((resolve, reject) => {
    request(url, function (error, response, body) {
      if (error) {
        return reject(error)
      } else {
        return resolve(body)
      }
    })
  })
}
