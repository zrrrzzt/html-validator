'use strict'

module.exports = (data, ignore) => {
  const list = data.split('\n')
  const filters = Array.isArray(ignore) ? ignore : [ignore]
  const doIgnore = (item) => filters.indexOf(item) === -1

  return list.filter(doIgnore).join('\n')
}
