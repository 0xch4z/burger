const fs = require('fs')
const path = require('path')
const webpack = require('webpack')
const { CheckerPlugin } = require('awesome-typescript-loader')

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
  devtool: 'source-map',

  entry: {
    app: [
      'webpack-hot-middleware/client?reload=true',
      './src/client/main.tsx',
      './src/vendor/main.tsx',
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
        loaders: [
          'react-hot-loader/webpack',
          'awesome-typescript-loader',
        ],
      },
      /* for hot module reloading */
      {
        test: /\.jsx$/,
        loader: 'babel-loader'
      },
      {
        test: CSS_RE,
        include: STYLES_DIR,
        loaders: [
          'style-loader',
          'css-loader?modules&importLoaders=2&localIdentName=[local]___[hash:base64:5]',
          'postcss-loader',
        ],
      },
      {
        test: /\.css$/,
        exclude: STYLES_DIR,
        loaders: [
          'style-loader',
          'css-loader'
        ],
      },
    ],
  },

  output: {
    filename: 'js/[name].js',
    path: path.resolve('./build/public'),
    pathinfo: true,
    publicPath: '/public/',
  },

  plugins: [
    LOADER_OPTS_PLUGIN,
    MANIFEST_PLUGIN,

    new webpack.DefinePlugin({
      'process.env': {
        BROWSER: JSON.stringify(true),
        NODE_ENV: JSON.stringify('development'),
      },
    }),

    new webpack.optimize.OccurrenceOrderPlugin(),

    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),

    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'js/[name].[hash].js',
      minChunks: Infinity
    }),

    new CheckerPlugin(),

    new webpack.HotModuleReplacementPlugin(),
  ],
}

mkdir('./build')
mkdir('./build/public')

module.exports = config
