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

tap.test('Valid.html should be valid', function (test) {
  const options = {
    format: 'json',
    data: fs.readFileSync('test/data/valid.html', 'utf-8')
  }
  validator(options)
    .then((data) => {
      const { isValid } = data
      tap.equal(isValid, true, 'html is valid')
      test.done()
    })
    .catch((error) => {
      throw error
    })
})

tap.test('Valid fragment should be valid', function (test) {
  const options = {
    format: 'json',
    data: '<p>This is valid stuff</p>',
    isFragment: true
  }
  validator(options)
    .then((data) => {
      const { isValid } = data
      tap.equal(isValid, true, 'fragment is valid')
      test.done()
    })
    .catch((error) => {
      throw error
    })
})

tap.test('Should get 4 error message from invalid.html', function (test) {
  const options = {
    format: 'json',
    data: fs.readFileSync('test/data/invalid.html', 'utf-8')
  }
  validator(options)
    .then((data) => {
      const { errorCount } = data
      tap.equal(errorCount, 4, 'html is invalid')
      test.done()
    })
    .catch((error) => {
      throw error
    })
})

tap.test('Should get 2 error message from invalid fragment', function (test) {
  const options = {
    format: 'json',
    data: '<div>This is not legal',
    isFragment: true
  }
  validator(options)
    .then((data) => {
      const { errorCount } = data
      tap.equal(errorCount, 3, 'fragment is invalid')
      test.done()
    })
    .catch((error) => {
      throw error
    })
})

tap.test('Should get 0 error messages from invalid.html if ignored', (test) => {
  const options = {
    format: 'text',
    data: fs.readFileSync('test/data/invalid.html', 'utf-8'),
    ignore: 'close-order'
  }
  validator(options)
    .then((data) => {
      const { isValid } = data
      tap.equal(isValid, true, 'No errors found')
      test.done()
    })
    .catch((error) => {
      throw error
    })
})
