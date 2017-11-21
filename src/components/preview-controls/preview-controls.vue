<template>
  <v-toolbar class="preview-controls white elevation-1">
    <v-select :value="selectedBrowser" :items="browserOptions" @change="changeBrowser" item-text="text" item-value="value" return-object class="preview-controls__select mr-4"></v-select>
    <v-slider disabled class="preview-controls__slider mr-4" v-model="zoomLevel" :min="zoomLevelMin" :max="zoomLevelMax" :step="zoomStep" snap :label="computedZoomLevel"></v-slider>
    <v-btn-toggle v-model="toggleView" mandatory class="mr-4">
      <v-btn flat disabled>
        <v-icon left >mdi-view-column</v-icon>
        Side-by-side
      </v-btn>
      <v-btn flat disabled>
        Flow
        <v-icon right>mdi-view-array</v-icon>
      </v-btn>
    </v-btn-toggle>
    <v-btn-toggle v-model="orientation" mandatory class="mr-4">
      <v-btn flat disabled>
        <v-icon left>mdi-cellphone</v-icon>
        Portrait
      </v-btn>
      <v-btn flat disabled>
        Landscape
        <v-icon right>mdi-tablet</v-icon>
      </v-btn>
    </v-btn-toggle>
  </v-toolbar>
</template>

<script>
  import VueTypes from 'vue-types'

  export default {
    props: {
      selectedBrowser: VueTypes.object.isRequired,
      browserOptions: VueTypes.array.isRequired
    },
    computed: {
      computedZoomLevel () {
        return (this.zoomLevel / 100).toFixed(1)
      }
    },
    data () {
      return {
        toggleView: 0,
        zoomLevel: 100,
        zoomStep: 10,
        zoomLevelMin: 10,
        zoomLevelMax: 200,
        orientation: 0
      }
    },
    methods: {
      changeBrowser (value) {
        this.$emit('previewControls:changeBrowser', value)
      }
    }
  }
</script>

<style src="./preview-controls.scss" lang="scss"></style>
