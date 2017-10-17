<template>
  <div class="manifest-editor">
    <codemirror v-model="code" :options="options"></codemirror>
  </div>
</template>

<script>
  import dummyData from './dummy-data.json'
  import debounce from '../../lib/debounce'
  import { codemirror } from 'vue-codemirror'
  require('../../lib/codemirror-lint-manifest')

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
        code: JSON.stringify(dummyData, null, '\t'),
        options: {
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
      code: debounce(function (val) {
        this.setManifest(val)
      }, 250)
    },
    created () {
      this.setManifest(this.code)
    }
  }
</script>

<style src="./manifest-editor.scss" lang="scss"></style>
