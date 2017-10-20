<template>
  <div v-if="isValid">
    <chrome-nav></chrome-nav>
    <chrome-prompt :manifest="manifest" :url="url"></chrome-prompt>
  </div>
</template>

<script>
  import ChromePrompt from '../chrome-prompt/chrome-prompt'
  import ChromeNav from '../chrome-nav/chrome-nav'

  export default {
    components: {
      ChromePrompt,
      ChromeNav
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
    },
    computed: {
      critiria () {
        return {
          'Served over HTTPS.': true,
          'Has a Service Worker.': true,
          'Has a `name`.': !!this.manifest.name,
          'Has a `short_name`.': !!this.manifest.short_name,
          'Has a `start_url` that loads.': !!this.manifest.start_url,
          'Has a PNG icon of 192x192 or larger.': true
        }
      },
      isValid () {
        return Object.values(this.critiria).filter(value => !value).length === 0
      }
    }
  }
</script>
