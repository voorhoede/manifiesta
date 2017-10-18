<template>
  <v-navigation-drawer app v-model="isOpen" clipped persistent absolute width="450" class="editor">
    <fetch-manifest></fetch-manifest>
    <template v-if="manifestStore.data">
      <manifest-editor></manifest-editor>
      <manifest-errors></manifest-errors>
    </template>
  </v-navigation-drawer>
</template>

<script>
  import {manifestStore} from '../../lib/manifest-store'
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
      }
    },
    data () {
      return {
        manifestStore
      }
    }
  }
</script>

<style src="./editor.scss" lang="scss"></style>
