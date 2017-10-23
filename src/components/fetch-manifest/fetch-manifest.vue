<template>
  <v-form v-model="urlValid" @submit.prevent="handleSubmit" class="fetch-manifest">
    <v-text-field label="URL" v-model="fetchUrl" :rules="urlErrors" required></v-text-field>
    <v-btn :disabled="disabled" @click.prevent="handleSubmit">Fetch manifest</v-btn>
  </v-form>
</template>

<script>
  const invalidUrlError = 'Invalid url'

  export default {
    props: {
      setManifest: {
        type: Function,
        required: true
      },
      url: {
        type: String,
        required: true
      },
      setUrl: {
        type: Function,
        required: true
      }
    },
    data () {
      return {
        fetchUrl: '',
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
        this.setUrl(this.fetchUrl)
        this.fetchManifest()
      },
      fetchManifest () {
        this.isFetching = true
        fetch(`https://fetch-manifest.now.sh/?url=${this.fetchUrl}`)
          .then(response => response.json())
          .then(response => {
            this.isFetching = false
            this.setManifest(response.manifest)
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
