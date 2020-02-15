const { HtmlValidate } = require('html-validate')
const filterMessages = require('./whatwg-filter-messages')
const config = require('./config')

module.exports = async options => {
  const htmlvalidate = new HtmlValidate()
  options.isLocal = !options.data
  const validatorOptions = await config(options)
  const { body, ignore } = validatorOptions
  const report = htmlvalidate.validateString(body)
  let { valid, errorCount, warningCount, results } = report
  let isValid = valid
  const messages = results.length > 0 ? results[0].messages : []
  let errors = messages.filter(message => message.severity === 2)
  let warnings = messages.filter(message => message.severity === 1)

  if (ignore) {
    errors = filterMessages(errors, ignore)
    warnings = filterMessages(warnings, ignore)
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