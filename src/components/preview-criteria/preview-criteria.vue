<template>
  <section class="preview-criteria">
    <h3 class="preview-criteria__title">Criteria for the Chrome install prompt:</h3>
    <ul class="preview-criteria__list">
      <li v-for="(value, text) in criteriaList" :key="text"
      class="preview-criteria__item" :class="value ? 'preview-criteria__item--pass' : 'preview-criteria__item--fail'">
        <span v-html="text"></span>
        <span class="a11y-only">{{ value ? 'is met. ' : 'isn\'t met.' }}</span>
      </li>
    </ul>
    <a href="https://developers.google.com/web/fundamentals/app-install-banners/#what_are_the_criteria" target="_blank" rel="noopener">Learn more</a>
  </section>
</template>

<script>
  import VueTypes from 'vue-types'

  export default {
    props: {
      criteriaList: VueTypes.object.isRequired
    }
  }
</script>

<style src="./preview-criteria.scss" lang="scss"></style>
