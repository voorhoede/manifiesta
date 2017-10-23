<template>
  <main class="preview">
    <v-content>
      <preview-controls></preview-controls>
      <div class="preview__column">
        <preview-device device="nexus-5x">
          <chrome-nav></chrome-nav>
          <chrome-prompt v-if="Object.keys(manifest).length" :manifest="manifest" :url="url" :hasSw="hasSw"></chrome-prompt>
          <browser-viewport :url="url"></browser-viewport>
        </preview-device>
        <preview-criteria :manifest="manifest" :url="url" :hasSw="hasSw"></preview-criteria>
      </div>
    </v-content>
  </main>
</template>

<script>
  import BrowserViewport from '../browser-viewport/browser-viewport'
  import ChromePrompt from '../chrome-prompt/chrome-prompt'
  import ChromeNav from '../chrome-nav/chrome-nav'
  import PreviewControls from '../preview-controls/preview-controls'
  import PreviewDevice from '../preview-device/preview-device'
  import PreviewCriteria from '../preview-criteria/preview-criteria'

  export default {
    components: {
      BrowserViewport,
      ChromePrompt,
      ChromeNav,
      PreviewControls,
      PreviewDevice,
      PreviewCriteria
    },
    props: {
      manifest: {
        type: Object,
        required: true
      },
      url: {
        type: String,
        required: true
      },
      hasSw: {
        type: Boolean,
        required: true
      }
    }
  }
</script>

<style src="./preview.scss" lang="scss"></style>
