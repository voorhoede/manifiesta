const { router, get } = require('microrouter')

module.exports = router(
  get('/fetch-headers/', require('fetch-headers')),
  get('/fetch-manifest/', require('fetch-manifest')),
  get('/webshot/', require('webshot-service'))
)
