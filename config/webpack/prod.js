const fs = require('fs')
const path = require('path')
const webpack = require('webpack')
const manifest = require('webpack-manifest-plugin')
const { CheckerPlugin } = require('awesome-typescript-loader')
const extractText = require('extract-text-webpack-plugin');

const { mkdir } = require('./utils')
const {
  CSS_RE,
  EXTS,
  IMG_RULE,
  JSON_RULE,
  LOADER_OPTS_PLUGIN,
  MANIFEST_PLUGIN,
  MODULES,
  STYLES_DIR,
  TS_OR_TSX_RE,
  TSLINT_RULE,
} = require('./shared')

const config = {
  bail: true,

  entry: {
    app: './src/client/main.tsx',
    vendor: [
      './src/vendor/main.tsx',
      'react',
      'react-dom',
      'react-helmet',
      'react-redux',
      'react-router',
      'react-router-redux',
      'redux',
      'redux-connect',
      'redux-thunk'
    ],
  },

  resolve: {
    extensions: EXTS,
    modules: MODULES,
  },

  module: {
    rules: [
      //TSLINT_RULE,
      JSON_RULE,
      IMG_RULE,
      {
        test: TS_OR_TSX_RE,
        loader: 'awesome-typescript-loader',
      },
      {
        test: CSS_RE,
        include: STYLES_DIR,
        loader: extractText.extract({
          fallback: 'style-loader',
          use: [
            'css-loader?modules&importLoaders=2&localIdentName=[local]___[hash:base64:5]',
            'postcss-loader',
          ],
        }),
      },
      {
        test: CSS_RE,
        exclude: STYLES_DIR,
        loader: extractText.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
          ],
        }),
      },
    ],
  },

  output: {
    filename: 'js/[name].[hash].js',
    path: path.resolve('./build/public'),
    publicPath: '/public/',
  },

  plugins: [
    LOADER_OPTS_PLUGIN,
    MANIFEST_PLUGIN,

    new extractText('css/[name].[hash].css'),

    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'js/[name].[hash].js',
      minChunks: Infinity
    }),

    new webpack.DefinePlugin({
      'process.env': {
        BROWSER: JSON.stringify(true),
        NODE_ENV: JSON.stringify('production'),
      },
    }),

    new webpack.HotModuleReplacementPlugin(),

    new CheckerPlugin(),

    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
    }),
  ],
}

mkdir('./build')
mkdir('./build/public')

module.exports = config
