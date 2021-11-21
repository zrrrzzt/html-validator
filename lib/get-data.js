const axios = require('axios').default

function getData (url) {
  return new Promise((resolve, reject) => {
    axios.get(url)
      .then(response => resolve(response.data))
      .catch(error => reject(error))
  })
}

module.exports = getData
