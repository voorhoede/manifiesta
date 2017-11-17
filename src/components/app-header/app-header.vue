<template>
  <v-toolbar clipped-left absolute app color="primary">
    <v-btn v-if="this.isOpen" icon class="white--text" @click.stop="toggleEditor">
      <v-icon>arrow_back</v-icon>
    </v-btn>
    <v-btn v-if="!this.isOpen" icon class="white--text" @click.stop="toggleEditor">
      <v-icon>arrow_forward</v-icon>
    </v-btn>
    <v-toolbar-title class="white--text">Manifiesta</v-toolbar-title>
  </v-toolbar>
</template>

<script>
  import VueTypes from 'vue-types'

  export default {
    props: {
      isOpen: VueTypes.bool.isRequired,
      toggleEditor: VueTypes.func.isRequired
    }
  }
</script>
