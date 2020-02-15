const { HtmlValidate } = require('html-validate')
const config = require('./config')

module.exports = async options => {
  const htmlvalidate = new HtmlValidate()
  options.isLocal = !options.data
  const validatorOptions = await config(options)
  const { body } = validatorOptions
  const report = htmlvalidate.validateString(body)
  const { valid, errorCount, warningCount, results } = report
  const isValid = valid
  const messages = results.length > 0 ? results[0].messages : []
  const errors = messages.filter(message => message.severity === 2)
  const warnings = messages.filter(message => message.severity === 1)

  return {
    isValid,
    errorCount,
    warningCount,
    errors,
    warnings
  }
}
