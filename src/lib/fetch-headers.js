let cache = {}

export default (url) => {
  const endpoint = `${process.env.FETCH_HEADERS_API}?url=${url}`

  if (cache[endpoint]) {
    return cache[endpoint]
  }

  cache[endpoint] = fetch(endpoint)
    .then(response => response.json())
    .then(({ errors, headers = [] }) => {
      if (errors) {
        return Promise.reject(errors[0])
      } else {
        return headers
      }
    })

  return cache[endpoint]
}
