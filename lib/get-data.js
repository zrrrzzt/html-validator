const axios = require('axios')

module.exports = async url => {
  const { data } = await axios.get(url)
  return data
}
