const tap = require('tap')
const filterMessages = require('../../lib/whatwg-filter-messages')

tap.test('returns all if none of the filters matches', test => {
  const messages = require('../data/messages.json')
  const ignores = []
  const filtered = filterMessages(messages, ignores)
  tap.equal(filtered.length, 3, 'None filtered ok')
  test.end()
})

tap.test('you can filter by ruleId', test => {
  const messages = require('../data/messages.json')
  const ignores = ['close-order']
  const filtered = filterMessages(messages, ignores)
  tap.equal(filtered.length, 0, 'Rule filter ok')
  test.end()
})

tap.test('you can filter by message', test => {
  const messages = require('../data/messages.json')
  const ignores = ["Mismatched close-tag, expected '</body>' but found '</html>'."]
  const filtered = filterMessages(messages, ignores)
  tap.equal(filtered.length, 2, 'Messages filter ok')
  test.end()
})

tap.test('you can filter by string', test => {
  const messages = require('../data/messages.json')
  const ignores = 'close-order'
  const filtered = filterMessages(messages, ignores)
  tap.equal(filtered.length, 0, 'Rule filter by string ok')
  test.end()
})
