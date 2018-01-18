const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const postcssAssets = require('postcss-assets');
const postcssNext = require('postcss-cssnext');
const stylelint = require('stylelint');

const { mkdir } = require('./utils')
const {
  CSS_RE,
  EXTS,
  JSON_RULE,
  IMG_RULE,
  LOADER_OPTS_PLUGIN,
  MODULES,
  TS_OR_TSX_RE,
  TSLINT_RULE,
} = require('./shared')

const nodeModules = {}

fs.readdirSync('node_modules')
  .filter(m => ['.bin'].indexOf(m) === -1)
  .forEach(m => nodeModules[m] = `commonjs ${m}`)

const config = {
  externals: nodeModules,
  target: 'node',

  resolve: {
    extensions: EXTS,
    modules: MODULES,
  },

  entry: './src/server/main.ts',

  output: {
    filename: 'server.js',
    path: path.resolve('./build'),
    publicPath: '/public/',
    libraryTarget: 'commonjs2'
  },

  module: {
    loaders: [
      JSON_RULE,
      IMG_RULE,
      {
        test: TS_OR_TSX_RE,
        loader: 'awesome-typescript-loader',
        exclude: /node_modules/
      },
      {
        test: CSS_RE,
        loaders: [
          'isomorphic-style-loader',
          'css-loader?modules&importLoaders=2&localIdentName=[local]___[hash:base64:5]'
        ],
      },
    ],
  },

  plugins: [
    LOADER_OPTS_PLUGIN,
  ],

  node: {
    Buffer: false,
    console: false,
    global: false,
    process: false,
    __filename: false,
    __dirname: false
  }
}

mkdir('./build')
mkdir('./build/public')

module.exports = config
