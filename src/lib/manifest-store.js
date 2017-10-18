export const manifestStore = {
  url: '',
  data: undefined,
  setUrl (value) {
    this.url = value
  },
  setData (value) {
    if (typeof value === 'object') {
      this.data = value
    } else {
      try {
        this.data = JSON.parse(value)
      } catch (error) {}
    }
  }
}
