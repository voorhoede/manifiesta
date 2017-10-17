<template>
  <iframe :src="manifest.url" width="100%" height="100%">
    <p>Your browser does not support iframes.</p>
  </iframe>
</template>

<script>
  export default {
    props: {
      manifest: {
        type: Object,
        required: true
      }
    }
  }
</script>
