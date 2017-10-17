<template>
    <v-navigation-drawer app v-model="isOpen" clipped persistent absolute width="450">
      <settings></settings>
      <manifest-editor :setManifest="setManifest"></manifest-editor>
      <manifest-errors></manifest-errors>
    </v-navigation-drawer>
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
    props: {
      isOpen: {
        type: Boolean,
        required: true
      }
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
