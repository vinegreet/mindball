const path = require('path');

const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const browsers = require('./package.json').browserslist;
const babelEnvPreset = ['env', {
  'targets': {
    'browsers': browsers
  }
}];

module.exports = {
  entry: path.resolve(__dirname, 'src/index.js'),
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist')
  },
  devtool: 'source-map',
  devServer: {
    publicPath: '/',
  },
  resolve: {
    alias: {
      constants: path.resolve(__dirname, 'src/constants'),
      utils: path.resolve(__dirname, 'src/utils'),
      components: path.resolve(__dirname, 'src/components'),
      state: path.resolve(__dirname, 'src/state'),
      actions: path.resolve(__dirname, 'src/actions')
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        use: [{
          loader: 'babel-loader',
          options: { presets: [babelEnvPreset, 'react'], plugins: ['transform-object-rest-spread', 'transform-class-properties'] },
        }]
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: true, // This prop enables CSS modules.
              localIdentName: '[local]_[hash:base64:5]', // Add naming scheme
              //plugins: ['react-css-modules']
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: function () {
                  return [autoprefixer(browsers)]
              }
            }
          }
        ],
      },
    ]
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      options: {
        context: __dirname,  // use this context
      }
    })
  ]
};