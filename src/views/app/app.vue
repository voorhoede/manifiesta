<template>
  <div class="app">
    <div class="input-container">
      <settings></settings>
      <manifest-editor :setManifest="setManifest"></manifest-editor>
    </div>
    <preview class="output-container" :manifest="manifest"></preview>
  </div>
</template>

<script>
  import ManifestEditor from '../../components/manifest-editor/manifest-editor'
  import Settings from '../../components/settings/settings'
  import Preview from '../../components/preview/preview'

  export default {
    components: {
      ManifestEditor,
      Settings,
      Preview
    },
    data () {
      return {
        manifest: {}
      }
    },
    methods: {
      setManifest: function (val) {
        try {
          this.manifest = JSON.parse(val)
        } catch (e) {}
      }
    }
  }
</script>

<style src="./app.scss" lang="scss"></style>
