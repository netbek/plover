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
                [
                  '@babel/plugin-transform-runtime',
                  {
                    helpers: false
                  }
                ],
                '@babel/plugin-proposal-class-properties',
                [
                  '@babel/plugin-proposal-object-rest-spread',
                  {useBuiltIns: false}
                ],
                '@babel/plugin-transform-object-assign' // For IE
              ]
            },
            production: {
              plugins: [
                [
                  '@babel/plugin-transform-runtime',
                  {
                    helpers: false
                  }
                ],
                '@babel/plugin-proposal-class-properties',
                [
                  '@babel/plugin-proposal-object-rest-spread',
                  {useBuiltIns: false}
                ],
                '@babel/plugin-transform-object-assign' // For IE
              ]
            }
          },
          presets: [
            [
              '@babel/preset-env',
              {
                loose: true,
                modules: 'commonjs',
                targets: {
                  browsers: browserslist
                },
                useBuiltIns: false
              }
            ]
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
