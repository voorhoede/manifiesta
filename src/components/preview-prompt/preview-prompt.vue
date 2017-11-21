<template>
  <div class="preview">
    <preview-device :browser="browser">
      <browser-viewport :url="url"></browser-viewport>
      <template v-if="browser.value === 'chrome'">
        <chrome-nav></chrome-nav>
        <chrome-prompt v-if="criteriaIsMet" :manifest="manifest" :url="url" :hasSw="hasSw"></chrome-prompt>
      </template>
    </preview-device>
    <preview-criteria :browser="browser" :criteriaList="criteriaList"></preview-criteria>
  </div>
</template>

<script>
  import VueTypes from 'vue-types'
  import BrowserViewport from '../browser-viewport/browser-viewport'
  import ChromePrompt from '../chrome-prompt/chrome-prompt'
  import ChromeNav from '../chrome-nav/chrome-nav'
  import PreviewDevice from '../preview-device/preview-device'
  import PreviewCriteria from '../preview-criteria/preview-criteria'
  import listCriteria from '../../lib/chrome-prompt-criteria'

  export default {
    components: {
      BrowserViewport,
      ChromePrompt,
      ChromeNav,
      PreviewDevice,
      PreviewCriteria
    },
    props: {
      manifest: VueTypes.object.isRequired,
      url: VueTypes.string.isRequired,
      hasSw: VueTypes.bool.isRequired,
      browser: VueTypes.object.isRequired
    },
    computed: {
      criteriaIsMet () {
        return Object.values(this.criteriaList).every(Boolean)
      },
      criteriaList () {
        return listCriteria({url: this.url, hasSw: this.hasSw, manifest: this.manifest})
      }
    }
  }
</script>
