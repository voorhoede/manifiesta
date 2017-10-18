<template>
  <div class="app">
    <v-app>
      <editor :isOpen="editorIsOpen"></editor>
      <app-header :toggleEditor="toggleEditor"></app-header>
      <preview v-if="manifestStore.url"></preview>
    </v-app>
  </div>
</template>

<script>
  import {manifestStore} from '../../lib/manifest-store'
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
        manifestStore,
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
