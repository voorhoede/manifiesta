export default ({ url, width, height }) => {
  return fetch(`${process.env.WEBSHOT_API}?url=${url}&w=${width}&h=${height}`)
    .then(response => {
      if (response.ok) {
        return response.blob()
      } else {
        return response.json()
          .then(json => Promise.reject(json.errors[0]))
      }
    })
}
