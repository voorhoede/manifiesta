<template>
  <div class="preview-device" :class="`preview-device--${device}`">
    <span class="preview-device-time">{{time}}</span>
    <div class="preview-device-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import getTime from '../../lib/get-time'

  export default {
    props: {
      device: {
        type: String,
        required: true
      }
    },
    data () {
      return {
        time: getTime()
      }
    }
  }
</script>

<style src="./preview-device.scss" lang="scss"></style>
