<template>
    <iframe v-if="isFrameable" :src="url" class="browser-viewport"></iframe>
    <img v-else-if="imageUrl" :alt="`Screenshot of ${url}`" :src="imageUrl" class="browser-viewport">
    <div v-else class="browser-viewport"><p>Site doesn't allow embedding. Fetching as image...</p></div>
</template>

<script>
  export default {
    props: {
      url: {
        type: String,
        required: true
      }
    },
    data () {
      return {
        imageUrl: undefined,
        isFrameable: true
      }
    },
    mounted: function () {
      this.checkFrameOptions(this.url)
    },
    methods: {
      checkFrameOptions: function (url) {
        this.isFrameable = true
        fetch(`${process.env.FETCH_HEADERS_API}?url=${url}`)
          .then(response => response.json())
          .then(({ errors, headers = [] }) => {
            if (errors) {
              return Promise.reject(errors[9])
            }
            const xFrameOptions = headers['x-frame-options']
            if (xFrameOptions) {
              this.isFrameable = false
              this.fetchScreenshot(url)
            } else {
              this.isFrameable = true
            }
          })
      },
      fetchScreenshot: function (url) {
        const dimensions = this.$el.getBoundingClientRect()
        const dpr = window.devicePixelRatio
        const width = Math.ceil(dimensions.width * dpr)
        const height = Math.ceil(dimensions.height * dpr)
        this.imageUrl = undefined
        fetch(`${process.env.WEBSHOT_API}?url=${url}&w=${width}&h=${height}`)
          .then(response => {
            if (response.ok) {
              return response.blob()
            } else {
              return response.json()
                .then(json => Promise.reject(json.errors[0]))
            }
          })
          .then(imageBlob => {
            this.imageUrl = URL.createObjectURL(imageBlob)
          })
          .catch(error => console.error(error.message))
      }
    },
    watch: {
      url: function (url) {
        this.checkFrameOptions(url)
      }
    }
  }
</script>

<style src="./browser-viewport.scss" lang="scss"></style>
