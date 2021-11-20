const tap = require('tap')
const { readFile } = require('fs').promises
const filterData = require('../../lib/filter-data')

tap.test('returns all errors on empty filter', async test => {
  const errors = await readFile('test/data/errors.txt', 'utf-8')
  const ignores = []
  const filtered = filterData(errors, ignores)
  tap.equal(filtered.split('\n').length, 33, 'Filtered untouched')
  return test.end()
})

tap.test('filters errors', async test => {
  const errors = await readFile('test/data/errors.txt', 'utf-8')
  const ignores = ['Error: Unclosed element “div”.']
  const filtered = filterData(errors, ignores)
  tap.equal(filtered.split('\n').length, 31, 'Filtered ok')
  return test.end()
})

tap.test('returns text on no errors left', async test => {
  const errors = ''
  const ignores = []
  const filtered = filterData(errors, ignores)
  const expectedText = 'The document validates according to the specified schema(s).'
  tap.equal(filtered, expectedText, 'Text returnes as expected')
  return test.end()
})
