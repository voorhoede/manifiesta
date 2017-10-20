<template>
  <div v-if="criteriaIsMet">
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
      },
      criteria: {
        type: Object,
        required: true
      },
      setCriteria: {
        type: Function,
        required: true
      },
      criteriaIsMet: {
        type: Boolean,
        required: true
      }
    },
    created () {
      this.setCriteria(this.checkCriteria())
    },
    watch: {
      manifest () {
        this.setCriteria(this.checkCriteria())
      }
    },
    methods: {
      checkCriteria () {
        return {
          'Served over HTTPS.': true,
          'Has a Service Worker.': true,
          'Has a `name`.': this.manifest.name || false,
          'Has a `short_name`.': this.manifest.short_name || false,
          'Has a `start_url` that loads.': this.manifest.start_url || false,
          'Has a PNG icon of 192x192 or larger.': true
        }
      }
    }
  }
</script>
