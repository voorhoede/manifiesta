<template>
  <div class="chrome-prompt" :class="{ 'is-open': isOpen}">
    <div class="chrome-prompt-content">
      <div class="chrome-prompt-image">
        <img :src="imageUrl" />
      </div>
      <div class="chrome-prompt-information">
        <h2 class="chrome-prompt-title">{{ promptTitle }}</h2>
        <p class="chrome-prompt-url">{{ hostname }}</p>
      </div>
      <button class="chrome-prompt-close" aria-label="Close push notification" @click="close">
        <svg xmlns="http://www.w3.org/2000/svg" height="14" viewBox="0 0 14 14" width="14">
          <path d="M14 1.4L12.6 0 7 5.6 1.4 0 0 1.4 5.6 7 0 12.6 1.4 14 7 8.4l5.6 5.6 1.4-1.4L8.4 7 14 1.4z" fill-rule="evenodd"/>
        </svg>
      </button>
    </div>
    <v-btn type="button" class="chrome-prompt-add" color="primary" :disabled="loading" @click="add" ripple>
        {{buttonText}}
    </v-btn>
  </div>
</template>

<script>
  export default {
    props: {
      manifest: {
        type: Object,
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
      hostname () {
        return new URL(this.url).hostname
      },
      promptTitle () {
        return this.manifest.short_name
      },
      imageUrl () {
        return this.url + this.manifest.icons[0].src
      },
      buttonText () {
        return (this.isAdded) ? 'Open' : 'Add'
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

<style src="./chrome-prompt.scss" lang="scss"></style>
