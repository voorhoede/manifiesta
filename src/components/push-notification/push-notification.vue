<template>
  <div class="push-notification" :class="{ 'is-open': isOpen}">
    <div class="push-notification-content">
      <div class="push-notification-image">
        <img :src="url + iconUrl" />
      </div>
      <div class="push-notification-information">
        <h2 class="push-notification-title">{{ shortName }}</h2>
        <p class="push-notification-url">{{ removeHost }}</p>
      </div>
      <button class="push-notification-close">&times;</button>
    </div>
    <button type="button" class="push-notification-open">Toevoegen</button>
  </div>
</template>

<script>
  export default {
    props: {
      iconUrl: {
        type: String
      },
      shortName: {
        type: String,
        required: true
      },
      url: {
        type: String,
        required: true
      }
    },
    data () {
      return {
        isOpen: false
      }
    },
    computed: {
      removeHost () {
        return this.url.replace(/^(https?:\/\/)?(www\.)?/, '')
      }
    },
    created () {
      const self = this
      setTimeout(function () {
        self.isOpen = true
      }, 2000)
    }
  }
</script>

<style src="./push-notification.scss" lang="scss"></style>
