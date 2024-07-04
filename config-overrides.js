const webpack = require('webpack');
const { override, addWebpackAlias } = require('customize-cra');

module.exports = override(
  addWebpackAlias({
    process: 'process/browser',
  }),
  config => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      buffer: require.resolve('buffer')
    };
    config.plugins = (config.plugins || []).concat(
      new webpack.ProvidePlugin({
        Buffer: ['buffer', 'Buffer'],
        process: 'process/browser'
      })
    );
    return config;
  }
);
