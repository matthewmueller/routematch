
# routematch

  simple, functional route matcher for node.js and the browser.

## install

```
npm install routematch
```

## examples

```js
// single
const { user } = match('/user/matt', '/user/:user')
assert.equal(user, 'matt')

// fallbacks
const { author, article } = match('/matt/node.js-guide', [
  '/user/:user',
  '/:author/:article'
])
assert.equal(author, 'matt')
assert.equal(article, 'node.js-guide')
```

## license

mit
