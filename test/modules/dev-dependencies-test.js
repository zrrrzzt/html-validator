'use strict'

const tap = require('tap')
const pkg = require('../../package.json')
const dependencies = pkg.devDependencies || {}
const dropModules = ['standard']
const isDropped = module => !dropModules.includes(module)

Object.keys(dependencies).filter(isDropped).forEach((dependency) => {
  const module = require(dependency)
  tap.ok(module, `${dependency} loads ok`)
})
