<template>
  <div class="app">
    <div class="input-container">
      <settings></settings>
      <codemirror v-model="editorCode" :options="editorOptions"></codemirror>
    </div>
    <preview class="output-container" :manifest="manifest"></preview>
  </div>
</template>

<script>
  import { codemirror } from 'vue-codemirror'
  import Settings from '@/components/settings/settings'
  import Preview from '@/components/preview/preview'
  import debounce from '@/lib/debounce'

  import dummyData from './dummy-data.json'

  export default {
    components: {
      Settings,
      Preview,
      codemirror
    },
    data () {
      return {
        editorCode: JSON.stringify(dummyData, null, '\t'),
        editorOptions: {
          indentUnit: 4,
          indentWithTabs: true,
          line: true,
          lineNumbers: true,
          lineWrapping: false,
          mode: 'application/json',
          smartIndent: true,
          tabSize: 4
        },
        manifest: {}
      }
    },
    watch: {
      editorCode: debounce(function (val) {
        this.setManifest(val)
      }, 2000)
    },
    created () {
      this.setManifest(this.editorCode)
    },
    methods: {
      setManifest: function (val) {
        console.log('henk')
        try {
          this.manifest = JSON.parse(val)
        } catch (e) {}
      }
    }
  }
</script>

<style src="./app.scss" lang="scss"></style>
