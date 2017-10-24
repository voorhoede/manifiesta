<template>
  <v-navigation-drawer app v-model="isOpen" clipped persistent absolute width="450" class="editor">
    <fetch-manifest :setManifest="setManifest" :url="url"
    :setUrl="setUrl" :isFetching="isFetching"
    :setIsFetching="setIsFetching" :setError="setError"></fetch-manifest>
    <div v-if="isFetching" class="editor__fetching">
      <p>Searching for manifest ... </p>
      <v-progress-linear :indeterminate="true"></v-progress-linear>
    </div>
    <div v-if="noManifestAfterSearch" class="editor__no-manifest">
      <p>No manifest found on the given url</p>
      <v-btn color="primary" @click="setSkeleton" class="editor__create-manifest">Create a manifest</v-btn>
      <p class="editor__error-message">{{error}}</p>
    </div>
    <template v-if="!manifestIsEmpty">
      <div class="editor__sw-checkbox">
        <v-checkbox v-model="checkbox" label="Has a Service Worker"></v-checkbox>
      </div>
      <manifest-editor :manifest="manifest" :setManifest="setManifest"></manifest-editor>
      <manifest-errors></manifest-errors>
    </template>
  </v-navigation-drawer>
</template>

<script>
  import VueTypes from 'vue-types'
  import manifestSkeleton from '../../lib/manifest-skeleton.json'
  import FetchManifest from '../fetch-manifest/fetch-manifest'
  import ManifestEditor from '../manifest-editor/manifest-editor'
  import ManifestErrors from '../manifest-errors/manifest-errors'

  export default {
    components: {
      FetchManifest,
      ManifestEditor,
      ManifestErrors
    },
    props: {
      isOpen: VueTypes.bool.isRequired,
      manifest: VueTypes.object.isRequired,
      setManifest: VueTypes.func.isRequired,
      url: VueTypes.string.isRequired,
      setUrl: VueTypes.func.isRequired,
      setHasSw: VueTypes.func.isRequired
    },
    data () {
      return {
        firstFetch: true,
        isFetching: false,
        checkbox: false,
        error: ''
      }
    },
    computed: {
      manifestIsEmpty () {
        return !Object.keys(this.manifest).length
      },
      noManifestAfterSearch () {
        const {isFetching, firstFetch, manifestIsEmpty} = this
        return !isFetching && !firstFetch && manifestIsEmpty
      }
    },
    watch: {
      checkbox () {
        this.setHasSw(this.checkbox)
      }
    },
    methods: {
      setIsFetching (value) {
        this.isFetching = value
        this.firstFetch = false
      },
      setSkeleton () {
        this.setManifest(manifestSkeleton)
      },
      setError (value) {
        this.error = value
      }
    }
  }
</script>

<style src="./editor.scss" lang="scss"></style>
