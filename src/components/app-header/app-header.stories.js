import { storiesOf } from '@storybook/vue'
import { action } from '@storybook/addon-actions'
import AppHeader from './app-header.vue'

storiesOf('app-header', module)
  .add('Default', () => ({
    components: { AppHeader },
    template: '<app-header :toggleEditor="toggleEditor"></app-header>',
    methods: { toggleEditor: action('toggle editor') }
  }))
