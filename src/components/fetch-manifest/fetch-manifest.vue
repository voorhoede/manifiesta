<template>
  <v-form v-model="urlValid" @submit.prevent="handleSubmit" class="fetch-manifest">
    <v-text-field label="URL" v-model="url" :rules="urlErrors" required></v-text-field>
    <v-btn :disabled="disabled" @click.prevent="handleSubmit">Fetch manifest</v-btn>
  </v-form>
</template>

<script>
  import {manifestStore} from '../../lib/manifest-store'

  const invalidUrlError = 'Invalid url'

  export default {
    data () {
      return {
        url: manifestStore.url,
        urlErrors: [
          (value) => {
            try {
              return !!new URL(value)
            } catch (error) {
              return invalidUrlError
            }
          }
        ],
        urlValid: false,
        isFetching: false
      }
    },
    computed: {
      disabled () {
        return !this.urlValid || this.isFetching
      }
    },
    methods: {
      handleSubmit () {
        manifestStore.setUrl(this.url)
        this.fetchManifest()
      },
      fetchManifest () {
        this.isFetching = true
        manifestStore.setData({})
        fetch(`https://fetch-manifest.now.sh/?url=${this.url}`)
          .then(response => response.json())
          .then(response => {
            this.isFetching = false
            manifestStore.setData(response.manifest)
          })
          .catch(error => {
            this.isFetching = false
            console.error(error)
          })
      }
    }
  }
</script>

<style src="./fetch-manifest.scss" lang="scss"></style>
