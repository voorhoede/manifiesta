import { configure } from '@storybook/vue'
import '../../src/core'

const req = require.context(`../../src/components`, true, /\.stories\.js$/)
const loadStories = () => req.keys().map(path => req(path))

configure(loadStories, module)
