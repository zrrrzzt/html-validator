const tap = require('tap')
const createDocument = require('../../lib/create-document-from-fragment')

tap.test('returns document from fragment', test => {
  const fragment = '<p>This is a fragment</p>'
  const document = createDocument(fragment)
  const expectedDocument = '<!DOCTYPE html><html lang="en"><head><title>Document from fragment</title></head><body><p>This is a fragment</p></body></html>'
  tap.equal(document, expectedDocument, 'document is correct')
  test.done()
})
