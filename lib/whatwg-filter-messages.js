module.exports = function (messages, ignore) {
  const filters = Array.isArray(ignore) ? ignore : [ignore]
  const filtered = messages.filter(item => {
    const { ruleId, message } = item
    if (filters.includes(ruleId) || filters.includes(message)) {
      return false
    } else {
      return true
    }
  })
  return filtered
}
