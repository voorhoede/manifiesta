// based on https://github.com/jbmoelker/fetch-headers/blob/master/index.js
const request = require('request-promise')

function missingParameterError (parameter, type = 'query') {
  return {
    code: 'MISSING_PARAMETER',
    parameter,
    message: `'${parameter}' ${type} parameter is required.`
  }
}

exports.handler = async (event, context, callback) => {
  const siteUrl = event.queryStringParameters.url
  const errors = []
  let headers

  const send = (statusCode, json) => callback(null, { statusCode, body: JSON.stringify(json) })

  if (!siteUrl) {
    errors.push(missingParameterError('url'))
  }
  if (errors.length > 0) {
    return send(400, { errors })
  }

  try {
    const response = await request({
      method: 'GET',
      uri: siteUrl,
      resolveWithFullResponse: true
    })
    headers = response.headers
  } catch (err) {
    return send(500, { errors: [
      { code: 'FETCH_ERROR', message: `Unable to fetch headers from '${siteUrl}'` }
    ]})
  }

  send(200, { siteUrl, headers })
}
