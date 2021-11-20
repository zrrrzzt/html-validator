const tap = require('tap')
const config = require('../../lib/config')

tap.test('config returns expected object as default', async test => {
  const options = {}
  const reqOptions = await config(options)

  tap.equal(reqOptions.qs.out, 'json', 'JSON is default format')
  return test.done()
})

tap.test('config returns expected object with inputs', async test => {
  const options = {
    validator: 'http://html5.validator.nu',
    url: 'https://www.github.com'
  }
  const reqOptions = await config(options)

  tap.equal(reqOptions.qs.doc, options.url, 'Uri is correct')
  tap.equal(reqOptions.uri, options.validator, 'Uri is correct')
  return test.done()
})

tap.test('config returns expected object with input from data', async test => {
  const options = {
    data: 'http://html5.validator.nu'
  }
  const reqOptions = await config(options)

  tap.equal(reqOptions.body, options.data, 'Data is correct')
  tap.equal(reqOptions.method, 'POST', 'Method is POST')
  tap.ok(reqOptions.headers, 'Headers are set')
  return test.done()
})

tap.test('config uses passed in headers', async test => {
  const headers = {
    foo: 'bar',
    'User-Agent': 'something'
  }
  const options = {
    headers
  }
  const reqOptions = await config(options)

  tap.same(reqOptions.headers, headers, 'headers are the same')
  return test.done()
})

tap.test('users defined headers takes prescient', async test => {
  const headers = {
    foo: 'bar',
    'User-Agent': 'something',
    'Content-Type': 'json'
  }
  const options = {
    headers,
    data: 'http://html5.validator.nu'
  }
  const reqOptions = await config(options)

  tap.same(reqOptions.headers, headers, 'user headers take prescient')
  return test.done()
})

tap.test('isLocal adds data to options', async test => {
  const options = {
    url: 'https://www.google.com',
    isLocal: true
  }
  const reqOptions = await config(options)

  tap.equal(reqOptions.method, 'POST', 'Method is POST')
  tap.ok(reqOptions.body, 'Body is set')
  return test.done()
})
