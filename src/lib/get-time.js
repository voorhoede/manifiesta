export default () => {
  const date = new Date()
  let h = date.getHours()
  let m = date.getMinutes()

  if (h < 10) {
    h = `0${h}`
  }

  if (m < 10) {
    m = `0${m}`
  }

  return `${h}:${m}`
}
