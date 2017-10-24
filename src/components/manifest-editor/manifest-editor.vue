<template>
  <div class="manifest-editor">
    <codemirror v-model="code" :options="options"></codemirror>
  </div>
</template>

<script>
  import VueTypes from 'vue-types'
  import debounce from '../../lib/debounce'
  import {codemirror} from 'vue-codemirror'
  require('../../lib/codemirror-lint-manifest')

  export default {
    components: {
      codemirror
    },
    props: {
      manifest: VueTypes.object.isRequired,
      setManifest: VueTypes.func.isRequired
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
          return JSON.stringify(this.manifest, null, '\t')
        },
        set: debounce(function (value) {
          this.setManifest(value)
        }, 250)
      }
    }
  }
</script>

<style src="./manifest-editor.scss" lang="scss"></style>
