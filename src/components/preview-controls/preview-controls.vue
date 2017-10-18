<template>
  <v-card class="preview-controls">
    <v-card-text>

      <v-btn-toggle v-model="toggleView" mandatory>
        <v-btn flat>
          <v-icon left>mdi-view-column</v-icon>
          Side-by-side
        </v-btn>
        <v-btn flat>
          Flow
          <v-icon right>mdi-view-array</v-icon>
        </v-btn>
      </v-btn-toggle>

      <v-select v-bind:items="browsers" v-model="browser" label="Browser" single-line bottom
      ></v-select>

      <div class="preview-controls-slider">
        Scale: {{computedZoomLevel}}
        <v-slider v-model="zoomLevel" v-bind:max="zoomLevelMax" step="10" snap></v-slider>
      </div>

      <v-btn-toggle v-model="orientation" mandatory>
        <v-btn flat>
          <v-icon left>mdi-cellphone</v-icon>
          Portrait
        </v-btn>
        <v-btn flat>
          Landscape
          <v-icon right>mdi-tablet</v-icon>
        </v-btn>
      </v-btn-toggle>

    </v-card-text>
  </v-card>
</template>

<script>
export default {
  computed: {
    computedZoomLevel () {
      return this.zoomLevel / 100
    }
  },
  data () {
    return {
      toggleView: 0,
      browser: 'Chrome',
      browsers: [
        'Chrome',
        'Samsung Internet',
        'Safari',
        'Firefox',
        'Opera'
      ],
      zoomLevel: 100,
      zoomLevelMax: 200,
      orientation: 0
    }
  }
}
</script>

<style src="./preview-controls.scss" lang="scss"></style>
