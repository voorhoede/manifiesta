<template>
  <div v-if="isValid">
    <chrome-nav></chrome-nav>
    <chrome-prompt></chrome-prompt>
  </div>
</template>

<script>
  import {manifestStore} from '../../lib/manifest-store'
  import ChromePrompt from '../chrome-prompt/chrome-prompt'
  import ChromeNav from '../chrome-nav/chrome-nav'

  export default {
    components: {
      ChromePrompt,
      ChromeNav
    },
    computed: {
      isValid () {
        const {data} = manifestStore
        return data.name && data.short_name && data.start_url && data.icons
      }
    }
  }
</script>
