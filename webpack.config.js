const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader')

var commonConfig = {
  mode: 'development',
  output: {
    path: path.resolve(__dirname + '/dist/'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: __dirname,
        exclude: /node_modules/
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      }
    ],
  },
  externals: {
    axios: 'axios'
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        sourceMap: false
      })
    ]
  },
  plugins: [
    // make sure to include the plugin for the magic
    new VueLoaderPlugin()
  ]
};

module.exports = [

  // Config 1: For browser environment
  merge(commonConfig, {
    entry: path.resolve(__dirname + '/src/plugin.js'),
    output: {
      filename: 'vue-search-mongo.min.js',
    }
  }),

  // Config 2: For Node-based development environments
  merge(commonConfig, {
    entry: path.resolve(__dirname + '/src/SearchMongo.vue'),
    output: {
      filename: 'vue-search-mongo.js',
      libraryTarget: 'umd',

      // These options are useful if the user wants to load the module with AMD
      library: 'vue-search-mongo',
      umdNamedDefine: true
    }  
  })

];