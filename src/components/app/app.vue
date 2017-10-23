<template>
  <div class="app">
    <v-app>
      <editor :isOpen="editorIsOpen" :manifest="manifest" :setManifest="setManifest" :url="url" :setUrl="setUrl"></editor>
      <app-header :toggleEditor="toggleEditor"></app-header>
      <preview v-if="url" :manifest="manifest" :url="url"></preview>
    </v-app>
  </div>
</template>

<script>
  import AppHeader from '../app-header/app-header'
  import Editor from '../editor/editor'
  import Preview from '../preview/preview'

  export default {
    components: {
      AppHeader,
      Editor,
      Preview
    },
    data () {
      return {
        url: '',
        manifest: {},
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
      }
    }
  }
</script>

<style src="./app.scss" lang="scss"></style>
