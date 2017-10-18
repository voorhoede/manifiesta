<template>
  <div class="manifest-editor">
    <h1>Manifest</h1>
    <codemirror v-model="code" :options="options"></codemirror>
  </div>
</template>

<script>
  import {manifestStore} from '../../lib/manifest-store'
  import debounce from '../../lib/debounce'
  import { codemirror } from 'vue-codemirror'
  require('../../lib/codemirror-lint-manifest')

  export default {
    components: {
      codemirror
    },
    data () {
      return {
        code: JSON.stringify(manifestStore.data, null, '\t'),
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
        manifestStore.set(val)
      }, 250)
    }
  }
</script>
