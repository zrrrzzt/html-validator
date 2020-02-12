const getData = require('./get-data')
const createDocument = require('./create-document-from-fragment')

module.exports = async options => {
  const { ignore, format } = options
  const reportFormat = ignore ? 'text' : format || 'json'
  const data = options.url ? await getData(options.url) : options.data
  options.data = options.isFragment ? createDocument(data) : data
  options.format = reportFormat

  return options
}
