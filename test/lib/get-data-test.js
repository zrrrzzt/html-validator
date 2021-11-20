const tap = require('tap')
const getData = require('../../lib/get-data')

tap.test('returns data', async test => {
  const url = 'https://www.google.com'
  const data = await getData(url)

  tap.ok(data, 'Got data')
  return test.end()
})

tap.test('throws error if invalid url', async test => {
  const url = 'http://buhu.dennefinnesikkeengangforannetenntest.com'
  try {
    await getData(url)
  } catch (error) {
    tap.ok(error, 'Got error')
    return test.end()
  }
})
