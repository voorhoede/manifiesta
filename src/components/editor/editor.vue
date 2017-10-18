<template>
    <v-navigation-drawer app v-model="isOpen" clipped persistent absolute width="450" class="editor">
      <manifest-editor></manifest-editor>
      <manifest-errors></manifest-errors>
    </v-navigation-drawer>
</template>

<script>
  import ManifestEditor from '../manifest-editor/manifest-editor'
  import ManifestErrors from '../manifest-errors/manifest-errors'

  export default {
    components: {
      ManifestEditor,
      ManifestErrors
    },
    props: {
      isOpen: {
        type: Boolean,
        required: true
      }
    }
  }
</script>

<style src="./editor.scss" lang="scss"></style>
