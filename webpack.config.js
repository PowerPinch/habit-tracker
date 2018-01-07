const webpack = require("webpack")

module.exports = {
  devtool: 'inline-source-map',
  entry: './index.js',
  output: {
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
        }
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: 'url-loader?limit=10000'
      }
    ]
  },
  plugins: [new webpack.EnvironmentPlugin(['NODE_ENV'])],
  devServer: {
    historyApiFallback: true,
  }
};
