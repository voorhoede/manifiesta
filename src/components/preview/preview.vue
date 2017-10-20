<template>
  <main>
    <v-content>
      <preview-controls></preview-controls>
      <preview-device>
        <chrome-display v-if="manifest" :manifest="manifest" :url="url"></chrome-display>
        <browser-viewport :url="url"></browser-viewport>
      </preview-device>
      <preview-errors></preview-errors>
    </v-content>
  </main>
</template>

<script>
  import BrowserViewport from '../browser-viewport/browser-viewport'
  import ChromeDisplay from '../chrome-display/chrome-display'
  import PreviewControls from '../preview-controls/preview-controls'
  import PreviewDevice from '../preview-device/preview-device'
  import PreviewErrors from '../preview-errors/preview-errors'

  export default {
    components: {
      BrowserViewport,
      ChromeDisplay,
      PreviewControls,
      PreviewDevice,
      PreviewErrors
    },
    props: {
      manifest: {
        type: Object,
        required: true
      },
      url: {
        type: String,
        required: true
      }
    }
  }
</script>
