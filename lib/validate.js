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
  const messages = results.length > 0 ? results[0].messages : []
  let errors = messages.filter(message => message.severity === 2)
  let warnings = messages.filter(message => message.severity === 1)

  if (ignore) {
    errors = filterData(errors, ignore)
    warnings = filterData(warnings, ignore)
    isValid = errors.length === 0
    errorCount = errors.length
    warningCount = warnings.length
  }

  return {
    isValid,
    errorCount,
    warningCount,
    errors,
    warnings
  }
}
