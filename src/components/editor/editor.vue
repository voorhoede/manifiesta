<template>
  <v-navigation-drawer app v-model="isOpen" clipped persistent absolute width="450" class="editor">
    <fetch-manifest :setManifest="setManifest" :url="url" :setUrl="setUrl" :isFetching="isFetching" :setIsFetching="setIsFetching"></fetch-manifest>
    <div v-if="isFetching" class="fetching">
      <p>Searching for manifest ... </p>
      <v-progress-linear :indeterminate="true"></v-progress-linear>
    </div>
    <div v-if="!isFetching && !firstFetch && manifestEmpty" class="no-manifest">
      <p>No manifest found on the given url</p>
      <v-btn color="primary" @click="setSkeleton">Create a manifest</v-btn>
    </div>
    <template v-if="!manifestEmpty">
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
        isFetching: false
      }
    },
    computed: {
      manifestEmpty () {
        return Object.keys(this.manifest).length === 0
      }
    },
    methods: {
      setIsFetching (value) {
        this.isFetching = value
        this.firstFetch = false
      },
      setSkeleton () {
        this.setManifest(manifestSkeleton)
      }
    }
  }
</script>

<style src="./editor.scss" lang="scss"></style>
