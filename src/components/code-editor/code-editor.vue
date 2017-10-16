<template>
  <codemirror v-model="editorCode" :options="editorOptions"></codemirror>
</template>

<script>
  import dummyData from './dummy-data.json'
  import debounce from '@/lib/debounce'
  import { codemirror } from 'vue-codemirror'
  require('../../lib/codemirror/lint-json')

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
          mode: {
            name: 'javascript',
            json: true
          },
          theme: 'eclipse',
          lineNumbers: false,
          tabSize: 2,
          lint: true,
          gutters: ['CodeMirror-lint-markers']
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
