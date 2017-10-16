<template>
  <div>
    <h1>Preview</h1>
    <phone>
      <iframe :src="manifest.url" title="iframe example 1" width="100%" height="100%">
        <p>Your browser does not support iframes.</p>
      </iframe>
      <pwa-prompt :url="manifest.url" :iconUrl="manifest.icons[0].src" :shortName="manifest.short_name"></pwa-prompt>
    </phone>
  </div>
</template>

<script>
  import Phone from '../phone/phone'
  import PwaPrompt from '../pwa-prompt/pwa-prompt'

  export default {
    components: {
      Phone,
      PwaPrompt
    },
    props: {
      manifest: {
        type: Object,
        required: true
      }
    }
  }
</script>
