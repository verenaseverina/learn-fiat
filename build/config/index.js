const resolve = require('../utils/resolve')
const commonConfig = {
  host: '0.0.0.0',
  port: 8181,
  assetsRoot: resolve('dist'),
  assetsPublicPath: '/'
}
module.exports = {
  dev: {
    ...commonConfig,
    jsFilename: 'asset/[name].[hash].js',
    cssFilename: 'asset/[name].[hash].css',
  },
  prod: {
    ...commonConfig,
    jsFilename: 'asset/[name].[chunkhash].js',
    cssFilename: 'asset/[name].[contenthash].css',
  }
}