const tap = require('tap')
const { readFile } = require('fs').promises
const validator = require('../../lib/whatwg-validator.js')

tap.test('returns valid for valid html', async test => {
  const html = await readFile('test/data/valid.html', 'utf-8')
  const options = {
    data: html
  }
  const result = await validator(options)
  tap.equal(result.isValid, true, 'Valid html ok')
  return test.end()
})

tap.test('returns invalid for invalid html', async test => {
  const html = await readFile('test/data/invalid.html', 'utf-8')
  const options = {
    data: html
  }
  const result = await validator(options)
  tap.equal(result.isValid, false, 'invalid html ok')
  return test.end()
})

tap.test('it supports ignore', async test => {
  const html = await readFile('test/data/invalid.html', 'utf-8')
  const options = {
    data: html,
    ignore: ['close-order']
  }
  const result = await validator(options)
  tap.equal(result.isValid, true, 'ignore ok')
  return test.end()
})
