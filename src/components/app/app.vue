<template>
  <div class="app">
    <app-header></app-header>
    <editor></editor>
    <preview :manifest="manifest"></preview>
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
        manifest: dummyData
      }
    }
  }
</script>

<style src="./app.scss" lang="scss"></style>
