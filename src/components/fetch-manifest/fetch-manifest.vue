<template>
  <v-form v-model="urlValid" @submit.prevent="handleSubmit" class="fetch-manifest">
    <v-text-field label="URL" v-model="fetchUrl" :rules="urlErrors" required></v-text-field>
    <v-btn class="fetch-manifest__button" :disabled="disabled" @click.prevent="handleSubmit">
      <template v-if="isFetching">Fetching ... </template>
      <template v-else>Fetch manifest</template>
    </v-btn>
  </v-form>
</template>

<script>
  import VueTypes from 'vue-types'
  const invalidUrlError = 'Invalid url'

  export default {
    props: {
      setManifest: VueTypes.func.isRequired,
      url: VueTypes.string.isRequired,
      setUrl: VueTypes.func.isRequired,
      isFetching: VueTypes.bool.isRequired,
      setIsFetching: VueTypes.func.isRequired,
      setError: VueTypes.func.isRequired
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
        fetch(`${process.env.FETCH_MANIFEST_API}?url=${this.fetchUrl}`)
          .then(response => response.json())
          .then(response => {
            if (response.errors) {
              return Promise.reject(response.errors[0].message)
            }
            return response
          })
          .then(({manifest}) => {
            this.setIsFetching(false)
            this.setManifest(manifest)
          })
          .catch(error => {
            this.setIsFetching(false)
            this.setError(error)
          })
      }
    }
  }
</script>

<style src="./fetch-manifest.scss" lang="scss"></style>
