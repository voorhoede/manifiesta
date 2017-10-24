'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  FETCH_HEADERS_API: `"http://localhost:6265/fetch-headers/"`,
  FETCH_MANIFEST_API: `"http://localhost:6265/fetch-manifest/"`,
  WEBSHOT_API: `"http://localhost:6265/webshot/"`
})
