const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = [
  {
    mode: "production",
    entry: './wwwroot/Scripts/React/index.jsx',
    output: {
      path: path.resolve(__dirname, './wwwroot/build'),
      filename: 'AllScripts.js'
    },
    module: {
      rules: [
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            'sass-loader'
          ]
        },
        {
          test: /\.jsx?$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
          query: {
            cacheDirectory: true,
            presets: ['@babel/react'],
            plugins: ['@babel/plugin-proposal-class-properties']
          }
        }
      ]
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: 'AllCss.css',
        chunkFilename: '[id].css'
      }),
      new OptimizeCssAssetsPlugin({
        assetNameRegExp: /\.css$/,
        cssProcessor: require('cssnano'),
        cssProcessorPluginOptions: {
          preset: ['default', { discardComments: { removeAll: true } }]
        },
        canPrint: true
      })
    ],
    externals: {
      // global app config object
      config: JSON.stringify({
        apiUrl: 'https://localhost:44331'
      })
    }
  }
];
