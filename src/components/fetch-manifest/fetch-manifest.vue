<template>
  <v-form v-model="urlValid" @submit.prevent="handleSubmit" class="fetch-manifest">
    <v-text-field label="URL" v-model="fetchUrl" :rules="urlErrors" required></v-text-field>
    <v-btn :disabled="disabled" @click.prevent="handleSubmit">
      <template v-if="isFetching">Fetching ... </template>
      <template v-else>Fetch manifest</template>
    </v-btn>
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
      },
      isFetching: {
        type: Boolean,
        required: true
      },
      setIsFetching: {
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
        urlValid: false
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
        this.setIsFetching(true)
        this.setManifest({})
        fetch(`https://fetch-manifest.now.sh/?url=${this.fetchUrl}`)
          .then(response => response.json())
          .then(response => {
            this.setIsFetching(false)
            this.setManifest(response.manifest)
          })
          .catch(error => {
            this.setIsFetching(false)
            console.error(error)
          })
      }
    }
  }
</script>

<style src="./fetch-manifest.scss" lang="scss"></style>
