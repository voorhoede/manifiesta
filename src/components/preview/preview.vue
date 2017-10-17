<template>
  <div>
    <h1>Preview</h1>
    <phone>
      <iframe :src="manifest.url" title="iframe example 1" width="100%" height="100%">
        <p>Your browser does not support iframes.</p>
      </iframe>
      <chrome-prompt :url="manifest.url" :iconUrl="manifest.icons[0].src" :shortName="manifest.short_name"></chrome-prompt>
    </phone>
  </div>
</template>

<script>
  import Phone from '../phone/phone'
  import PwaPrompt from '../chrome-prompt/chrome-prompt'

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
