<template>
  <main>
    <v-content>
      <preview-controls></preview-controls>
      <preview-device>
        <chrome-nav></chrome-nav>
        <chrome-prompt></chrome-prompt>
        <browser-viewport></browser-viewport>
      </preview-device>
      <preview-errors></preview-errors>
    </v-content>
  </main>
</template>

<script>
  import BrowserViewport from '../browser-viewport/browser-viewport'
  import ChromePrompt from '../chrome-prompt/chrome-prompt'
  import ChromeNav from '../chrome-nav/chrome-nav'
  import PreviewControls from '../preview-controls/preview-controls'
  import PreviewDevice from '../preview-device/preview-device'
  import PreviewErrors from '../preview-errors/preview-errors'

  export default {
    components: {
      BrowserViewport,
      ChromePrompt,
      ChromeNav,
      PreviewControls,
      PreviewDevice,
      PreviewErrors
    }
  }
</script>
