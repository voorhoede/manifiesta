<template>
  <iframe :src="siteUrl" width="100%" height="100%">
    <p>Your browser does not support iframes.</p>
  </iframe>
</template>

<script>
  import {manifestStore} from '../../lib/manifest-store'

  export default {
    computed: {
      siteUrl () {
        return manifestStore.url
      }
    }
  }
</script>
