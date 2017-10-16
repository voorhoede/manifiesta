<template>
  <div>
    <h1>Preview</h1>
    <phone>
      <iframe :src="manifest.url" title="iframe example 1" width="100%" height="100%">
        <p>Your browser does not support iframes.</p>
      </iframe>
      <push-notification :url="manifest.url" :iconUrl="manifest.icons[0].src" :shortName="manifest.short_name"></push-notification>
    </phone>
  </div>
</template>

<script>
  import Phone from '../phone/phone'
  import PushNotification from '../push-notification/push-notification'

  export default {
    components: {
      Phone,
      PushNotification
    },
    props: {
      manifest: {
        type: Object,
        required: true
      }
    }
  }
</script>
