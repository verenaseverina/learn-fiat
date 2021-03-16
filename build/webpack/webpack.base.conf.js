const CopyWebpackPlugin = require('copy-webpack-plugin')
const resolve = require('../utils/resolve')
const configBase = require('../config')

const isProd = process.env.NODE_ENV === 'production'
const config = isProd ? configBase.prod : configBase.dev

const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const safePostCssParser = require('postcss-safe-parser')


const webpackBase = {
  entry: {
    app: [
      resolve('build/utils/polyfill.js'),
      resolve('src/app.js'),
    ]
  },
  output: {
    path: config.assetsRoot,
    publicPath: config.assetsPublicPath,
    filename: config.jsFilename,
    chunkFilename: config.jsFilename,
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.js$/,
        exclude: file => /node_modules/.test(file) && !/\.vue\.js/.test(file),
        loader: 'babel-loader',
        options: {
          babelrc: true,
        }
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: process.env.NODE_ENV === 'development',
              reloadAll: true,
            },
          },
          'css-loader',
          'postcss-loader',
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                strictMath: true,
                noIeCompat: true,
              }
            },
          },
          {
            loader: 'style-resources-loader',
            options: {
              patterns: [
                resolve('node_modules/@dana/fiat/src/styles/core/variables.less'),
              ],
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[contenthash].[ext]',
              outputPath: 'static/img',
              esModule: false // <- here
            }
          }
        ]
      }
    ]
  },

  plugins: [
    new VueLoaderPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'public',
          to: 'public',
          globOptions: {
            ignore: ['**/index.html'],
          },
        },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: config.cssFilename,
      chunkFilename: config.cssFilename,
    }),
  ],
  resolve: {
    alias: {
      vue$: 'vue/dist/vue.esm.js',
    },
    extensions: [".js", ".vue", ".less" ],
  },
  optimization: {
    minimize: false,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          parse: {
            ecma: 8,
          },
          compress: {
            ecma: 5,
            warnings: false,
            comparisons: false,
            inline: 2,
          },
          mangle: {
            safari10: true,
          },
          output: {
            ecma: 5,
            comments: false,
            ascii_only: true,
          },
        },
        cache: true,
        sourceMap: isProd,
      }),
      new OptimizeCSSAssetsPlugin({
        cssProcessorOptions: {
          parser: safePostCssParser,
          map: isProd
            ? {
              inline: false,
              annotation: true,
            }
            : false,
        },
      }),
    ],
    // splitChunks: {
    //   chunks: 'all',
    //   cacheGroups: {
    //     vendor: {
    //       name: 'vendors',
    //       test: /[\\/]node_modules[\\/](vue|vue-router|vuex)[\\/]/,
    //       priority: 1,
    //     },
    //     default: {
    //       name: 'commons',
    //       enforce: true,
    //       minChunks: 2,
    //     },
    //   },
    // },
  },
}

module.exports = webpackBase;