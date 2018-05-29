const validator = require('./index')
const options = {
  url: 'https://www.github.com',
  format: 'cucumber'
}

validator(options)
  .then((data) => {
    console.log(data)
  })
  .catch((error) => {
    console.error(error)
  })
