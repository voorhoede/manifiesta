import { storiesOf } from '@storybook/vue'

import PreviewDevice from './preview-device.vue'

storiesOf('preview-device', module)
  .add('Nexus 5X', () => ({
    components: { PreviewDevice },
    template: '<preview-device device="nexus-5x"></preview-device>'
  }))
