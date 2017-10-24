<template>
  <div class="preview-device" :class="`preview-device--${device}`">
    <span class="preview-device__time">{{time}}</span>
    <div class="preview-device__content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import VueTypes from 'vue-types'
  import getTime from '../../lib/get-time'

  export default {
    props: {
      device: VueTypes.string.isRequired
    },
    data () {
      return {
        time: getTime()
      }
    }
  }
</script>

<style src="./preview-device.scss" lang="scss"></style>
