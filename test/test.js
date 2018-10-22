/* global describe, it */
const match = require('..')
const assert = require('assert')

describe('routematch', function() {
  it('should match string routes', function() {
    const { user } = match('/user/matt', '/user/:user')
    assert.equal(user, 'matt')
  })

  it('should match multiples', function() {
    const { author, article } = match('/matt/node.js-guide', '/:author/:article')
    assert.equal(author, 'matt')
    assert.equal(article, 'node.js-guide')
  })

  it('should work with no matches', function() {
    const { user } = match('/user', '/user/:user')
    assert.equal(user, null)
  })

  it('should work with fallbacks', function() {
    const { user, author, article } = match(
      '/matt/node.js-guide',
      '/user/:user',
      '/:author/:article'
    )
    assert.equal(author, 'matt')
    assert.equal(article, 'node.js-guide')
    assert.equal(user, null)
  })
})
