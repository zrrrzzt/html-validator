'use strict'

const tap = require('tap')
const pkg = require('../../package.json')
const dependencies = pkg.dependencies || {}

Object.keys(dependencies).forEach((dependency) => {
  const module = require(dependency)
  tap.ok(module, `${dependency} loads ok`)
})
