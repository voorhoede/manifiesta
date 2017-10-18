<template>
  <main>
    <v-content>
      <preview-controls></preview-controls>
      <preview-device>
        <chrome-display></chrome-display>
        <browser-viewport></browser-viewport>
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
    }
  }
</script>
