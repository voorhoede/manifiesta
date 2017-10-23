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
      isValid () {
        const {manifest} = this
        return manifest.name && manifest.short_name && manifest.start_url && manifest.icons
      }
    }
  }
</script>
