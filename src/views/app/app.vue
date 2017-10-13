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

  export default {
    components: {
      Settings,
      Preview,
      codemirror
    },
    data () {
      return {
        editorCode: `
        {
          "url": "http://www.voorhoede.nl",
          "short_name": "De Voorhoede",
          "name": "De Voorhoede Front-end Developers",
          "start_url": "/?homescreen=true",
          "display": "standalone",
          "orientation": "portrait",
          "gcm_sender_id": "482941778795",
          "theme_color": "#12353C",
          "background_color": "#E7D81D",
          "icons": [
            {
              "src": "/assets/images/logo-36x36.png",
              "sizes": "36x36",
              "type": "image/png"
            },
            {
              "src": "/assets/images/logo-48x48.png",
              "sizes": "48x48",
              "type": "image/png"
            },
            {
              "src": "/assets/images/logo-72x72.png",
              "sizes": "72x72",
              "type": "image/png"
            },
            {
              "src": "/assets/images/logo-96x96.png",
              "sizes": "96x96",
              "type": "image/png"
            },
            {
              "src": "/assets/images/logo-144x144.png",
              "sizes": "144x144",
              "type": "image/png"
            },
            {
              "src": "/assets/images/logo-192x192.png",
              "sizes": "192x192",
              "type": "image/png"
            },
            {
              "src": "/assets/images/logo-256x256.png",
              "sizes": "256x256",
              "type": "image/png"
            },
            {
              "src": "/assets/images/logo-384x384.png",
              "sizes": "384x384",
              "type": "image/png"
            },
            {
              "src": "/assets/images/logo-512x512.png",
              "sizes": "512x512",
              "type": "image/png"
            },
            {
              "src": "/assets/images/logo-1024x1024.png",
              "sizes": "1024x1024",
              "type": "image/png"
            }
          ]
        }
        `,
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
        this.setManifest(val)
      }
    },
    created () {
      this.setManifest(this.editorCode)
    },
    methods: {
      setManifest: function (val) {
        try {
          this.manifest = JSON.parse(val)
        } catch (e) {}
      }
    }
  }
</script>

<style src="./app.scss" lang="scss"></style>
