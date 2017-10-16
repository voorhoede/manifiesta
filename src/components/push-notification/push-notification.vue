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
      <button class="push-notification-close">
        <svg xmlns="http://www.w3.org/2000/svg" height="14" viewBox="0 0 14 14" width="14">
          <path d="M14 1.4L12.6 0 7 5.6 1.4 0 0 1.4 5.6 7 0 12.6 1.4 14 7 8.4l5.6 5.6 1.4-1.4L8.4 7 14 1.4z" fill-rule="evenodd"/>
        </svg>
      </button>
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
