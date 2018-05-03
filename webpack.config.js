const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const {browserslist} = require('./package.json');

module.exports = {
  resolve: {
    extensions: ['.js'],
    modules: ['node_modules/', 'vega/src/js/']
  },
  node: {
    global: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader?cacheDirectory',
        options: {
          babelrc: false,
          comments: false,
          env: {
            development: {
              plugins: [
                'transform-object-assign',
                ['transform-object-rest-spread', {useBuiltIns: false}],
                'transform-remove-strict-mode'
              ]
            },
            production: {
              plugins: [
                'transform-object-assign',
                ['transform-object-rest-spread', {useBuiltIns: false}],
                'transform-remove-strict-mode'
              ]
            }
          },
          presets: [
            [
              'env',
              {
                exclude: [
                  'transform-async-to-generator',
                  'transform-regenerator'
                ],
                loose: true,
                modules: 'commonjs',
                targets: {
                  browsers: browserslist
                },
                useBuiltIns: false
              }
            ],
            'stage-2'
          ]
        }
      }
    ]
  },
  externals: {
    vega: 'vega',
    'vega-embed': 'vegaEmbed'
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new UglifyJsPlugin({
      cache: true,
      parallel: true,
      include: /\.min\.js$/
    })
  ]
};
