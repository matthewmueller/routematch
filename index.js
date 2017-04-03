/*
 * Module dependencies
 */

var Regexp = require('path-to-regexp')

/**
 * Export `routematch`
 */

module.exports = routematch

/**
 * Export `routematch`
 */

function routematch (pathname, fallbacks) {
  if (typeof fallbacks === 'string') {
    fallbacks = [fallbacks]
  }

  var params = {}
  for (var i = 0, len = fallbacks.length; i < len; i++) {
    var m = match(fallbacks[i], params, pathname)
    if (m) return params
  }
  return params
}

/**
 * Patch replace
 */

function match (path, params, pathname) {
  var keys = []
  var regexp = Regexp(path, keys)
  var m = regexp.exec(pathname)

  if (!m) return false
  else if (!params) return true

  for (var i = 1, len = m.length; i < len; ++i) {
    var key = keys[i - 1]
    var val = typeof m[i] === 'string' ? decodeURIComponent(m[i]) : m[i]
    if (key) params[key.name] = val
  }

  return true
}
