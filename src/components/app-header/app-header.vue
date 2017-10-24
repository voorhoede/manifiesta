<template>
  <v-toolbar clipped-left absolute app color="primary">
    <v-toolbar-side-icon class="white--text" @click.stop="toggleEditor"></v-toolbar-side-icon>
    <v-toolbar-title class="white--text">Manifiesta</v-toolbar-title>
  </v-toolbar>
</template>

<script>
  import VueTypes from 'vue-types'

  export default {
    props: {
      toggleEditor: VueTypes.func.isRequired
    }
  }
</script>
