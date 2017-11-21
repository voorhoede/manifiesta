<template>
  <div class="preview-device" :class="`preview-device--${browser.value}`">
    <component :is="`${browser.value}Frame`"></component>
    <span class="preview-device__status-bar">
      <span class="preview-device__status-icons">
        <span class="preview-device__battery">
          98%
          <v-icon dark>battery_full</v-icon>
        </span>
        <span class="preview-device__time">{{time}}</span>
      </span>
    </span>
    <div class="preview-device__content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import VueTypes from 'vue-types'
  import getTime from '../../lib/get-time'
  import chromeFrame from './devices/nexus-5x.svg'
  import samsungInternetFrame from './devices/samsung-s5.svg'

  export default {
    components: {
      chromeFrame,
      samsungInternetFrame
    },
    props: {
      browser: VueTypes.object.isRequired
    },
    data () {
      return {
        time: getTime()
      }
    }
  }
</script>

<style src="./preview-device.scss" lang="scss"></style>
