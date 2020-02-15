const tap = require('tap')
const { readFile } = require('fs').promises
const validator = require('../../index')
const whatwgResponse = {
  isValid: true,
  errorCount: 0,
  warningCount: 0,
  errors: [],
  warnings: []
}

tap.test('returns whatwg if validator is set', async test => {
  const html = await readFile('test/data/valid.html', 'utf-8')
  const options = {
    data: html,
    validator: 'whatwg'
  }
  const results = await validator(options)
  tap.equal(JSON.stringify(results), JSON.stringify(whatwgResponse), 'Got whatwg data')
  return test.done()
})
