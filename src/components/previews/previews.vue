<template>
  <main class="previews">
    <v-content>
      <preview-controls></preview-controls>
      <div class="preview__column">
        <preview-prompt :manifest="manifest" :url="url" :hasSw="hasSw"></preview-prompt>
      </div>
    </v-content>
  </main>
</template>

<script>
  import VueTypes from 'vue-types'
  import PreviewControls from '../preview-controls/preview-controls'
  import PreviewPrompt from '../preview-prompt/preview-prompt'

  export default {
    components: {
      PreviewControls,
      PreviewPrompt
    },
    props: {
      manifest: VueTypes.object.isRequired,
      url: VueTypes.string.isRequired,
      hasSw: VueTypes.bool.isRequired
    }
  }
</script>

<style src="./previews.scss" lang="scss"></style>
