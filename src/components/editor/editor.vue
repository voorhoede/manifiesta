<template>
  <v-navigation-drawer app v-model="isOpen" clipped persistent absolute width="450" class="editor">
    <fetch-manifest :setManifest="setManifest" :url="url" :setUrl="setUrl" :isFetching="isFetching" :setIsFetching="setIsFetching" :setError="setError"></fetch-manifest>
    <div v-if="isFetching" class="fetching">
      <p>Searching for manifest ... </p>
      <v-progress-linear :indeterminate="true"></v-progress-linear>
    </div>
    <div v-if="noManifestAfterSearch" class="no-manifest">
      <p>No manifest found on the given url</p>
      <v-btn color="primary" @click="setSkeleton" class="create-manifest">Create a manifest</v-btn>
      <p class="error-message">{{error}}</p>
    </div>
    <template v-if="!manifestIsEmpty">
      <manifest-editor :manifest="manifest" :setManifest="setManifest"></manifest-editor>
      <manifest-errors></manifest-errors>
    </template>
  </v-navigation-drawer>
</template>

<script>
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
      isOpen: {
        type: Boolean,
        required: true
      },
      manifest: {
        type: Object,
        required: true
      },
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
        firstFetch: true,
        isFetching: false,
        error: ''
      }
    },
    computed: {
      manifestIsEmpty () {
        return Object.keys(this.manifest).length === 0
      },
      noManifestAfterSearch () {
        return !this.isFetching && !this.firstFetch && this.manifestIsEmpty
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
