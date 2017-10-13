<template>
  <div>
    <h1>Preview</h1>
    <phone>
      <iframe :src="manifest.url" title="iframe example 1" width="100%" height="100%">
        <p>Your browser does not support iframes.</p>
      </iframe>
    </phone>
    <phone>

    </phone>
    <phone>

    </phone>
    <phone>

    </phone>
  </div>
</template>

<script>
  import Phone from '@/components/phone/phone'

  export default {
    components: {
      Phone
    },
    props: {
      manifest: {
        type: Object,
        required: true
      }
    }
  }
</script>
