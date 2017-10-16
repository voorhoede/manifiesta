<template>
  <codemirror v-model="editorCode" :options="editorOptions"></codemirror>
</template>

<script>
  import debounce from '@/lib/debounce'
  import { codemirror } from 'vue-codemirror'
  import dummyData from './dummy-data.json'

  export default {
    components: {
      codemirror
    },
    props: {
      setManifest: {
        type: Function,
        required: true
      }
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
        }
      }
    },
    watch: {
      editorCode: debounce(function (val) {
        this.setManifest(val)
      }, 250)
    },
    created () {
      this.setManifest(this.editorCode)
    }
  }
</script>
