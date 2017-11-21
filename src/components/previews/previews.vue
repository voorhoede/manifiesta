<template>
  <main class="previews">
    <v-content>
      <preview-controls :selectedBrowser="selectedBrowser" :browserOptions="browserOptions" @previewControls:changeBrowser="changeBrowser"></preview-controls>
      <div class="preview__column">
        <preview-prompt :manifest="manifest" :url="url" :hasSw="hasSw" :browser="selectedBrowser"></preview-prompt>
      </div>
      <div class="preview__column">
        <preview-prompt :manifest="manifest" :url="url" :hasSw="hasSw" :browser="selectedBrowser"></preview-prompt>
      </div>
      <div class="preview__column">
        <preview-prompt :manifest="manifest" :url="url" :hasSw="hasSw" :browser="selectedBrowser"></preview-prompt>
      </div>
    </v-content>
  </main>
</template>

<script>
  import VueTypes from 'vue-types'
  import PreviewControls from '../preview-controls/preview-controls'
  import PreviewPrompt from '../preview-prompt/preview-prompt'

  const browserOptions = [
    { text: 'Chrome', value: 'chrome' },
    { text: 'Samsung Internet', value: 'samsungInternet' }
  ]

  export default {
    components: {
      PreviewControls,
      PreviewPrompt
    },
    props: {
      manifest: VueTypes.object.isRequired,
      url: VueTypes.string.isRequired,
      hasSw: VueTypes.bool.isRequired
    },
    data () {
      return {
        selectedBrowser: browserOptions[0],
        browserOptions
      }
    },
    methods: {
      changeBrowser (value) {
        this.selectedBrowser = value
      }
    }
  }
</script>

<style src="./previews.scss" lang="scss"></style>
