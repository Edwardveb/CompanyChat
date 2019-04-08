const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = [
  {
    mode: "development",
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
            MiniCssExtractPlugin.loader, //'style-loader' : MiniCssExtractPlugin.loader
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