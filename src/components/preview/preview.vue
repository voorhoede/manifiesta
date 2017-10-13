<template>
  <div>
    <h1>Preview</h1>
    {{manifest}}
  </div>
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
