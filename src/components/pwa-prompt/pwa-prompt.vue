<template>
  <div class="pwa-prompt" :class="{ 'is-open': isOpen}">
    <div class="pwa-prompt-content">
      <div class="pwa-prompt-image">
        <img :src="url + iconUrl" />
      </div>
      <div class="pwa-prompt-information">
        <h2 class="pwa-prompt-title">{{ shortName }}</h2>
        <p class="pwa-prompt-url">{{ removeHost }}</p>
      </div>
      <button class="pwa-prompt-close" aria-label="Close push notification" @click="close">
        <svg xmlns="http://www.w3.org/2000/svg" height="14" viewBox="0 0 14 14" width="14">
          <path d="M14 1.4L12.6 0 7 5.6 1.4 0 0 1.4 5.6 7 0 12.6 1.4 14 7 8.4l5.6 5.6 1.4-1.4L8.4 7 14 1.4z" fill-rule="evenodd"/>
        </svg>
      </button>
    </div>
    <button
      type="button"
      class="pwa-prompt-add"
      :disabled="loading"
      @click="add"
    >
        {{buttonText}}
    </button>
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
        isOpen: false,
        isAdded: false,
        loading: false
      }
    },
    computed: {
      removeHost () {
        return this.url.replace(/^(https?:\/\/)?(www\.)?/, '')
      },
      buttonText () {
        return (this.isAdded) ? 'Openen' : 'Toevoegen'
      }
    },
    created () {
      setTimeout(() => {
        this.isOpen = true
      }, 2000)
    },
    methods: {
      close: function () {
        this.isOpen = false
      },
      add: function () {
        if (!this.isAdded) {
          const randomTime = Math.round(Math.random() * (3000)) + 500
          this.loading = true

          setTimeout(() => {
            this.loading = false
            this.isAdded = true
          }, randomTime)
        }

        // Add functionality for the flow, to go to the splash screen
      }
    }
  }
</script>

<style src="./pwa-prompt.scss" lang="scss"></style>
