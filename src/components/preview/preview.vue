<template>
  <main class="preview">
    <v-content>
      <div class="chrome">
        <preview-controls></preview-controls>
        <preview-device>
          <chrome-display v-if="manifest" :manifest="manifest" :url="url" :criteria="criteria" :setCriteria="setCriteria" :criteriaIsMet="criteriaIsMet"></chrome-display>
          <browser-viewport :url="url"></browser-viewport>
        </preview-device>
        <preview-criteria :criteria="criteria" :criteriaIsMet="criteriaIsMet"></preview-criteria>
      </div>
    </v-content>
  </main>
</template>

<script>
  import BrowserViewport from '../browser-viewport/browser-viewport'
  import ChromeDisplay from '../chrome-display/chrome-display'
  import PreviewControls from '../preview-controls/preview-controls'
  import PreviewDevice from '../preview-device/preview-device'
  import PreviewCriteria from '../preview-criteria/preview-criteria'

  export default {
    components: {
      BrowserViewport,
      ChromeDisplay,
      PreviewControls,
      PreviewDevice,
      PreviewCriteria
    },
    props: {
      manifest: {
        type: Object,
        required: true
      },
      url: {
        type: String,
        required: true
      }
    },
    data () {
      return {
        criteria: {}
      }
    },
    computed: {
      criteriaIsMet () {
        if (Object.keys(this.criteria).length > 0) {
          return Object.values(this.criteria).filter(value => !value).length === 0
        }

        return false
      }
    },
    methods: {
      setCriteria (value) {
        this.criteria = value
      }
    }
  }
</script>

<style src="./preview.scss" lang="scss"></style>
