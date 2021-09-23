const htmlWebpackPlugin = require('html-webpack-plugin');
const minifyCssPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: ['./src/index.js', './src/scss/style.scss'],
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
          },
        ],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
      {
        test: /\.(scss)$/,
        use: [
          {
            loader: minifyCssPlugin.loader,
          },
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    new htmlWebpackPlugin({
      template: './src/index.html',
      filename: './index.html',
    }),
    new minifyCssPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
  ],
};
