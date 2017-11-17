const { router, get } = require('microrouter')

module.exports = router(
  get('/fetch-headers/', require('@jbmoelker/fetch-headers')),
  get('/fetch-manifest/', require('@jbmoelker/fetch-manifest')),
  get('/webshot/', require('@jbmoelker/webshot-service'))
)
