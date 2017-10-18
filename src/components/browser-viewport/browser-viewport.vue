<template>
  <iframe :src="siteUrl" width="100%" height="100%">
    <p>Your browser does not support iframes.</p>
  </iframe>
</template>

<script>
  import {manifestStore} from '../../lib/manifest-store'

  export default {
    data () {
      return {
        manifestStore
      }
    },
    computed: {
      siteUrl () {
        return this.manifestStore.data.url
      }
    }
  }
</script>
