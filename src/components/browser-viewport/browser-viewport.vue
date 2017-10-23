<template>
  <iframe :src="url" class="browser-viewport">
    <p>Your browser does not support iframes.</p>
  </iframe>
</template>

<script>
  export default {
    props: {
      url: {
        type: String,
        required: true
      }
    }
  }
</script>

<style src="./browser-viewport.scss" lang="scss"></style>
