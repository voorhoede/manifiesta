import dummyData from './dummy-data.json'

export const manifestStore = {
  data: dummyData,
  set (val) {
    if (typeof val === 'object') {
      this.data = val
    } else {
      try {
        this.data = JSON.parse(val)
      } catch (e) {}
    }
  }
}
