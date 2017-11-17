<template>
  <div class="app">
    <v-app>
      <editor :isOpen="editorIsOpen" :manifest="manifest" :setManifest="setManifest" :url="url" :setUrl="setUrl" :setHasSw="setHasSw"></editor>
      <app-header :toggleEditor="toggleEditor"></app-header>
      <previews v-if="url" :manifest="manifest" :url="url" :hasSw="hasSw"></previews>
    </v-app>
  </div>
</template>

<script>
  import AppHeader from '../app-header/app-header'
  import Editor from '../editor/editor'
  import Previews from '../previews/previews'

  export default {
    components: {
      AppHeader,
      Editor,
      Previews
    },
    data () {
      return {
        url: '',
        manifest: {},
        hasSw: false,
        editorIsOpen: true
      }
    },
    methods: {
      toggleEditor () {
        this.editorIsOpen = !this.editorIsOpen
      },
      setUrl (value) {
        this.url = value
      },
      setManifest (value) {
        if (typeof value === 'object') {
          this.manifest = value
        } else {
          try {
            this.manifest = JSON.parse(value)
          } catch (error) {}
        }
      },
      setHasSw (value) {
        this.hasSw = value
      }
    }
  }
</script>
