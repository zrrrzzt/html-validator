const tap = require('tap')
const getData = require('../../lib/get-data')

tap.test('returns data', async test => {
  const url = 'https://html5.validator.nu'
  const data = await getData(url)

  tap.ok(data, 'Got data')
  test.done()
})

tap.test('throws error if invalid url', async test => {
  const url = 'http://buhu.dennefinnesikkeengangforannetenntest.com'
  try {
    const data = await getData(url)
    console.log(data)
  } catch (error) {
    tap.ok(error, 'Got error')
    test.done()
  }
})
