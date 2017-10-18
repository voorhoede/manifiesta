<template>
  <v-form v-model="urlValid" @submit.prevent="submit">
    <v-text-field label="URL" v-model="url" :rules="urlErrors" required></v-text-field>
    <v-btn :disabled="!urlValid" @click.prevent="submit">Fetch manifest</v-btn>
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
        urlValid: false
      }
    },
    methods: {
      submit () {
        manifestStore.setUrl(this.url)
        this.fetchManifest()
      },
      fetchManifest () {
        manifestStore.setData({})
        fetch(`http://localhost:3000/?url=${this.url}`)
          .then(response => response.json())
          .then(response => {
            manifestStore.setData(response.manifest)
          })
          .catch(error => { console.error(error) })
      }
    }
  }
</script>
