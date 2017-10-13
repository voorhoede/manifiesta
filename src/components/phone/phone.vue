<template>
  <div class="phone">
    <span class="phone-time">{{time}}</span>
    <div class="phone-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import getTime from '../../lib/getTime'

  export default {
    data () {
      return {
        time: getTime()
      }
    }
  }
</script>

<style src="./phone.scss" lang="scss"></style>
