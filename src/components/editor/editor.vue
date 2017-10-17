<template>
  <div class="editor">
    <settings></settings>
    <manifest-editor :setManifest="setManifest"></manifest-editor>
    <manifest-errors></manifest-errors>
  </div>
</template>

<script>
  import Settings from '../../components/settings/settings'
  import ManifestEditor from '../../components/manifest-editor/manifest-editor'
  import ManifestErrors from '../../components/manifest-errors/manifest-errors'

  export default {
    components: {
      Settings,
      ManifestEditor,
      ManifestErrors
    },
    data () {
      return {
        manifest: {}
      }
    },
    methods: {
      setManifest (val) {
        try {
          this.manifest = JSON.parse(val)
        } catch (e) {}
      }
    }
  }
</script>
