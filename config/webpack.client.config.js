const merge = require('webpack-merge');
const webpack = require('webpack');
const baseConfig = require('./webpack.base.config');
const { resolve } = require('./utils');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const appEnv = require('./env');
const env = appEnv.getWebEnvironment('/');
const config = require('./config')[process.env.NODE_ENV];

const clientConfig = merge(baseConfig(config), {
  entry: resolve('src/client-entry.js'),
  devtool: config.devtool,
  mode: config.env,
  plugins: [
    new webpack.DefinePlugin(env.stringified),

    // cp 静态资源
    new CopyWebpackPlugin([
      {
        from: resolve('static'),
        to: resolve('build/static')
      }
    ]),

    new HtmlWebpackPlugin({
      filename: 'server.template.ejs',
      template: resolve('src/server.template.ejs')
    })
  ]
});

if (process.env.NODE_ENV === 'production') {
  clientConfig.optimization.splitChunks = {
    chunks: 'initial',
    minSize: 0,
    maxAsyncRequests: 5,
    maxInitialRequests: 3,
    automaticNameDelimiter: '~',
    name: true,
    cacheGroups: {
      vendor: {
        test: /[\\/]node_modules[\\/]/,
        chunks: 'all',
        name: 'vendor',
        minChunks: 1,
        priority: 10
      }
    }
  };

  clientConfig.optimization.runtimeChunk = {
    name: 'manifest'
  };
}

module.exports = clientConfig;
