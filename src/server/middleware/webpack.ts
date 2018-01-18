import * as $webpack from 'webpack';
import * as wphMiddleware from 'webpack-hot-middleware';
import * as wpdMiddleware from 'webpack-dev-middleware';

const wpconfig = require('../../../config/webpack/dev')

const compiler = $webpack(wpconfig);

export const webpackDev = wpdMiddleware(compiler, {
  publicPath: wpconfig.output.publicPath,
  stats: { colors: true },
  noInfo: true,
  hot: true,
  inline: true,
  lazy: false,
  historyApiFallback: true,
  quiet: true,
});

export const webpackHot = wphMiddleware(compiler);
