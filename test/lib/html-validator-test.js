'use strict'

const tap = require('tap')
const fs = require('fs')
const validator = require('../../index')

tap.test('Requires options to be specified', function (test) {
  const options = false
  const expectedErrorMessage = 'Missing required input: options object'
  validator(options)
    .then((data) => {
      console.log(data)
    })
    .catch((error) => {
      tap.equal(error.message, expectedErrorMessage, expectedErrorMessage)
      test.done()
    })
})

tap.test('Requires options.url or options.data to be specified', function (test) {
  const options = {}
  const expectedErrorMessage = 'Missing required params: url or data'
  validator(options)
    .then((data) => {
      console.log(data)
    })
    .catch((error) => {
      tap.equal(error.message, expectedErrorMessage, expectedErrorMessage)
      test.done()
    })
})

tap.test('Returns error if invalid validator is specified', function (test) {
  const options = {
    url: 'http://www.github.com',
    validator: 'http://buhu.dennefinnesikkeengangforannetenntest.com'
  }
  validator(options)
    .then((data) => {
      console.log(data)
    })
    .catch((error) => {
      tap.ok(error, 'Validator not found')
      test.done()
    })
})

tap.test('Requires options.url to be a valid url', function (test) {
  const options = {
    url: 'pysjefanten'
  }
  const expectedErrorMessage = 'Invalid url'
  validator(options)
    .then((data) => {
      console.log(data)
    })
    .catch((error) => {
      tap.equal(error.message, expectedErrorMessage, expectedErrorMessage)
      test.done()
    })
})

tap.test('Returns error if not status 200 OK', function (test) {
  const options = {
    url: 'https://www.github.com',
    format: 'cucumber'
  }
  const expectedErrorMessage = 'Validator returned unexpected statuscode: 400'
  validator(options)
    .then((data) => {
      console.log(data)
    })
    .catch((error) => {
      tap.equal(error.message, expectedErrorMessage, expectedErrorMessage)
      test.done()
    })
})

tap.test('Should get 0 error messages from valid.html', function (test) {
  const options = {
    format: 'json',
    data: fs.readFileSync('test/data/valid.html')
  }
  validator(options)
    .then((data) => {
      var errors = 0
      data.messages.forEach(function (msg) {
        if (msg.type === 'error') {
          errors++
        }
      })
      tap.equal(errors, 0, 'html is valid')
      test.done()
    })
    .catch((error) => {
      throw error
    })
})

tap.test('Should get 1 error message from invalid.html', function (test) {
  const options = {
    format: 'json',
    data: fs.readFileSync('test/data/invalid.html')
  }
  validator(options)
    .then((data) => {
      var errors = 0
      data.messages.forEach(function (msg) {
        if (msg.type === 'error') {
          errors++
        }
      })
      tap.equal(errors, 1, 'html is invalid')
      test.done()
    })
    .catch((error) => {
      throw error
    })
})

tap.test('Should get 0 error messages from invalid.html if ignored', (test) => {
  const options = {
    format: 'text',
    data: fs.readFileSync('test/data/invalid.html'),
    ignore: 'Error: Stray end tag “div”.'
  }
  validator(options)
    .then((data) => {
      tap.equal(false, /Error/.test(data), 'No errors found')
      test.done()
    })
    .catch((error) => {
      throw error
    })
})
