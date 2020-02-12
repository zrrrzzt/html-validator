const { HtmlValidate } = require('html-validate')
const config = require('./config')
const filterData = require('./filter-data')

module.exports = async options => {
  const htmlvalidate = new HtmlValidate()
  const Options = await config(options)
  const { data, ignore } = Options
  const report = htmlvalidate.validateString(data)
  let { valid, errorCount, warningCount, results } = report
  let isValid = valid
  let messages = results.length > 0 ? results[0].messages : []

  if (ignore) {
    console.log('ignore!')
    messages = filterData(messages, ignore)
    isValid = messages.length === 0
    errorCount = messages.length
  }

  return {
    isValid,
    errorCount,
    warningCount,
    messages
  }
}
