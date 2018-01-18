const { LoaderOptionsPlugin } = require('webpack')
const manifest = require('webpack-manifest-plugin')
const { resolve } = require('path')

module.exports = {
  /* extensions */
  EXTS: ['.ts', '.tsx', '.js'],
  /* wp tests */
  TS_OR_TSX_RE: /\.tsx?$/,
  CSS_RE: /\.css$/,
  IMG_RE: /\.(jpe?g|png|gif)$/i,
  /* dirs */
  MODULES: ['node_modules', 'client'],
  STYLES_DIR: resolve('./src/client/styles'),
  /* shared rules */
  TSLINT_RULE: {
    test: this.TS_OR_TSX_RE,
    loader: 'tslint-loader'
  },
  IMG_RULE: {
    test: /\.(png|gif|jpg)$/i,
    loader: 'url-loader?limit=1000&name=images/[hash].[ext]'
  },
  JSON_RULE: {
    test: /\.json$/,
    loader: 'json-loader',
  },
  /* wp plugins */
  LOADER_OPTS_PLUGIN: new LoaderOptionsPlugin({
    debug: true,
    options: {
      tslint: { failOnHint: true },
      postcss: (() => [
        postcssAssets({ relative: true }),
        postcssNext(),
      ]),
    },
  }),
  MANIFEST_PLUGIN: new manifest({ fileName: '../manifest.json' })
}
