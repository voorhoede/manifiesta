<template>
  <div v-if="meetsAllCriteria" class="chrome-prompt" :class="{ 'chrome-prompt--is-open': isOpen}">
    <div class="chrome-prompt__content">
      <div class="chrome-prompt__image">
        <img :src="imageUrl" />
      </div>
      <div class="chrome-prompt__information">
        <h2 class="chrome-prompt__title">{{ promptTitle }}</h2>
        <p class="chrome-prompt__url">{{ hostname }}</p>
      </div>
      <button class="chrome-prompt__close" aria-label="Close push notification" @click="close">
        <svg class="chrome-prompt__svg" xmlns="http://www.w3.org/2000/svg" height="14" viewBox="0 0 14 14" width="14">
          <path class="chrome-prompt__path" d="M14 1.4L12.6 0 7 5.6 1.4 0 0 1.4 5.6 7 0 12.6 1.4 14 7 8.4l5.6 5.6 1.4-1.4L8.4 7 14 1.4z" fill-rule="evenodd"/>
        </svg>
      </button>
    </div>
    <v-btn type="button" class="chrome-prompt__add" color="primary" :disabled="loading" @click="add" ripple>
        {{buttonText}}
    </v-btn>
  </div>
</template>

<script>
  import VueTypes from 'vue-types'
  import listCriteria from '../../lib/chrome-prompt-criteria'

  const delayTimer = 2000

  export default {
    props: {
      manifest: VueTypes.object.isRequired,
      url: VueTypes.string.isRequired,
      hasSw: VueTypes.bool.isRequired
    },
    data () {
      return {
        isOpen: false,
        isAdded: false,
        loading: false
      }
    },
    computed: {
      meetsAllCriteria () {
        const criteria = listCriteria({url: this.url, hasSw: this.hasSw, manifest: this.manifest})
        const meetsAllCriteria = Object.values(criteria).every(Boolean)
        if (meetsAllCriteria) {
          return true
        }

        this.reset()
        return false
      },
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
      this.start()
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
      },
      reset: function () {
        this.isOpen = false
        this.isAdded = false
        this.loading = false
        this.start()
      },
      start: function () {
        setTimeout(() => {
          this.isOpen = true
        }, delayTimer)
      }
    }
  }
</script>

<style src="./chrome-prompt.scss" lang="scss"></style>
