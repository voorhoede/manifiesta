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
  import Settings from '../../components/settings/settings'
  import Preview from '../../components/preview/preview'

  export default {
    components: {
      Settings,
      Preview,
      codemirror
    },
    data () {
      return {
        editorCode: '{\n\n}',
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
      editorCode: function (val) {
        try {
          this.manifest = JSON.parse(val)
        } catch (e) {}
      }
    }
  }
</script>

<style src="./app.scss" lang="scss"></style>
