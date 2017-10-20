<template>
  <div class="preview-criteria">
    <p>Criteria for the Chrome install prompt:</p>
    <ul>
      <li v-for="(item, index) in criteriaList" :key="index" :aria-label="`Criterium ${item.title} is ${item.isMet ? 'is met.' : 'isn\'t met.'}.`">
        <span v-if="item.isMet" class="icon met">&#10003;</span>
        <span v-else class="icon unmet">&#10007;</span>
        {{item.title}}
      </li>
    </ul>
    <a href="https://developers.google.com/web/fundamentals/app-install-banners/#what_are_the_criteria">Learn more</a>
  </div>
</template>

<script>
  export default {
    props: {
      criteria: {
        type: Object,
        required: true
      },
      criteriaIsMet: {
        type: Boolean,
        required: true
      }
    },
    computed: {
      criteriaList () {
        return Object.keys(this.criteria)
                     .map(value => {
                       return {
                         title: value,
                         isMet: this.criteria[value]
                       }
                     })
      }
    }
  }
</script>

<style src="./preview-criteria.scss" lang="scss"></style>
