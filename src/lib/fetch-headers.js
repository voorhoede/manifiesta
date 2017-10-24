export default (url) => {
  return fetch(`${process.env.FETCH_HEADERS_API}?url=${url}`)
    .then(response => response.json())
    .then(({ errors, headers = [] }) => {
      if (errors) {
        return Promise.reject(errors[0])
      } else {
        return headers
      }
    })
}
