(async () => {
  const { readFile } = require('fs').promises
  const validator = require('./index')
  const html = await readFile('test/data/invalid.html', 'utf-8')
  const options = {
    data: html,
    validator: 'whatwg'
  }
  try {
    const result = await validator(options)
    console.info(result)
  } catch (error) {
    console.error(error)
  }
})()
