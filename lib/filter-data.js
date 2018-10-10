module.exports = function (data, ignore) {
  const list = data.split('\n')
  const filters = Array.isArray(ignore) ? ignore : [ignore]
  let errors = false
  const results = []
  list.forEach(function (line, index) {
    if (line.startsWith('Error') && filters.indexOf(line) === -1) {
      results.push(line)
      results.push(list[index + 1])
      errors = true
    } else if (line.startsWith('The')) {
      results.push(line)
    }
  })
  return errors === true ? results.join('\n') : 'The document validates according to the specified schema(s).'
}
