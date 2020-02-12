const tap = require('tap')
const config = require('../../lib/config')

tap.test('config returns expected object as default', async test => {
  const options = {}
  const reqOptions = await config(options)
  tap.equal(reqOptions.format, 'json', 'JSON is default format')
  return test.done()
})
