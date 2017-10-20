<template>
  <v-navigation-drawer app v-model="isOpen" clipped persistent absolute width="450" class="editor">
    <fetch-manifest :setManifest="setManifest" :url="url" :setUrl="setUrl"></fetch-manifest>
    <template v-if="!manifestEmpty">
      <manifest-editor :manifest="manifest" :setManifest="setManifest"></manifest-editor>
      <manifest-errors></manifest-errors>
    </template>
  </v-navigation-drawer>
</template>

<script>
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
    computed: {
      manifestEmpty () {
        return Object.keys(this.manifest).length === 0
      }
    }
  }
</script>

<style src="./editor.scss" lang="scss"></style>
