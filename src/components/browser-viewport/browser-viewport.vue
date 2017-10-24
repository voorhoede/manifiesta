<template>
  <iframe :src="url" class="browser-viewport">
    <p>Your browser does not support iframes.</p>
  </iframe>
</template>

<script>
  import VueTypes from 'vue-types'

  export default {
    props: {
      url: VueTypes.string.isRequired
    }
  }
</script>

<style src="./browser-viewport.scss" lang="scss"></style>
