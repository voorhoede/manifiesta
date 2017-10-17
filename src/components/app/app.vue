<template>
  <div class="app">
    <v-app>
      <editor :isOpen="editorIsOpen"></editor>
      <app-header :toggleEditor="toggleEditor"></app-header>
      <preview :manifest="manifest"></preview>
    </v-app>
  </div>
</template>

<script>
  import AppHeader from '../app-header/app-header'
  import Editor from '../editor/editor'
  import Preview from '../preview/preview'
  import dummyData from '../manifest-editor/dummy-data.json'

  export default {
    components: {
      AppHeader,
      Editor,
      Preview
    },
    data () {
      return {
        manifest: dummyData,
        editorIsOpen: true
      }
    },
    methods: {
      toggleEditor () {
        this.editorIsOpen = !this.editorIsOpen
      }
    }
  }
</script>

<style src="./app.scss" lang="scss"></style>
