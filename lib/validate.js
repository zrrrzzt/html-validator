const w3c = require('./w3c-validator')
const whatwg = require('./whatwg-validator')

module.exports = async options => {
  const { validator } = options
  const useWHATWG = validator && validator.toLowerCase() === 'whatwg'
  return useWHATWG ? whatwg(options) : w3c(options)
}
