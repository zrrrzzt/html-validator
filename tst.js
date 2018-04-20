'use strict'

const validator = require('./index')
const options = {
  url: 'https://getbootstrap.com/docs/4.0/components/collapse',
  format: 'text'
}

validator(options)
  .then((data) => {
    console.log(data)
  })
  .catch((error) => {
    console.error(error)
  })
