// https://storybook.js.org/configurations/custom-webpack-config/
const genDefaultConfig = require('@storybook/vue/dist/server/config/defaults/webpack.config.js')
const prodEnv = require('../prod.env')
const webpack = require('webpack')

module.exports = (baseConfig, nodeEnv) => {
  const config = genDefaultConfig(baseConfig, nodeEnv)

  config.plugins.push(
    new webpack.DefinePlugin(
      prefixObjectKeys(prodEnv, 'process.env.')
    )
  )

  return config
}

function prefixObjectKeys (obj, prefix) {
  return Object.keys(obj).reduce((out, key) => Object.assign(out, {
    [`${prefix}${key}`]: obj[key]
  }), {})
}
