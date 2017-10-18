<template>
  <div class="manifest-editor">
    <codemirror v-model="code" :options="options"></codemirror>
  </div>
</template>

<script>
  import debounce from '../../lib/debounce'
  import {manifestStore} from '../../lib/manifest-store'
  import {codemirror} from 'vue-codemirror'
  require('../../lib/codemirror-lint-manifest')

  export default {
    components: {
      codemirror
    },
    data () {
      return {
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
    computed: {
      code: {
        get () {
          return JSON.stringify(manifestStore.data, null, '\t')
        },
        set: debounce(value => manifestStore.setData(value), 250)
      }
    }
  }
</script>

<style src="./manifest-editor.scss" lang="scss"></style>
