import { storiesOf } from '@storybook/vue'
import { withKnobs, text } from '@storybook/addon-knobs'
import BrowserViewport from './browser-viewport.vue'

const createStory = ({ url, width = '320px', height = '480px' }) => ({
  components: { BrowserViewport },
  template: `
    <div style="width:${width}; height:${height};">
      <browser-viewport :url="'${url}'"></browser-viewport>
    </div>
  `
})

storiesOf('browser-viewport', module)
  .addDecorator(withKnobs)
  .add('Input URL', () => {
    const url = text('URL', 'https://www.voorhoede.nl')
    return createStory({ url })
  })
  .add('Using iframe', () => createStory({ url: 'https://www.voorhoede.nl' }))
  .add('Using image ', () => createStory({ url: 'https://www.tradus.com' }))
