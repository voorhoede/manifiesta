<template>
    <iframe v-if="isFrameable" :src="url" class="browser-viewport"></iframe>
    <img v-else-if="imageUrl" :alt="`Screenshot of ${url}`" :src="imageUrl" class="browser-viewport">
    <div v-else class="browser-viewport"><p>Site doesn't allow embedding. Fetching as image...</p></div>
</template>

<script>
  import fetchHeaders from '../../lib/fetch-headers'
  import fetchScreenshot from '../../lib/fetch-screenshot'
  import VueTypes from 'vue-types'

  export default {
    props: {
      url: VueTypes.string.isRequired
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
        fetchHeaders(url)
          .then(headers => this.setFrameable(url, !headers['x-frame-options']))
          .catch(this.showError)
      },
      getDimensions: function () {
        const dimensions = this.$el.getBoundingClientRect()
        const dpr = window.devicePixelRatio
        const width = Math.ceil(dimensions.width * dpr)
        const height = Math.ceil(dimensions.height * dpr)
        return { width, height }
      },
      setImageFromBlob: function (imageBlob) {
        this.imageUrl = URL.createObjectURL(imageBlob)
      },
      setFrameable: function (url, isFrameable) {
        this.isFrameable = isFrameable
        if (!isFrameable) this.useScreenshot(url)
      },
      showError: function (error) {
        console.error(error.message)
      },
      useScreenshot: function (url) {
        const { width, height } = this.getDimensions()
        this.imageUrl = undefined
        fetchScreenshot({ url, width, height })
          .then(this.setImageFromBlob)
          .catch(this.showError)
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
