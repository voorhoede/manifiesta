let cache = {}

export default ({ url, width, height }) => {
  const endpoint = `${process.env.WEBSHOT_API}?url=${url}&w=${width}&h=${height}`

  if (cache[endpoint]) {
    return cache[endpoint]
  }

  cache[endpoint] = fetch(endpoint)
    .then(response => {
      if (response.ok) {
        return response.blob()
      } else {
        return response.json()
          .then(json => Promise.reject(json.errors[0]))
      }
    })

  return cache[endpoint]
}
