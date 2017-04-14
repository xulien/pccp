//var webpack = require('webpack')

module.exports = {
  devtool: 'eval-source-map',
  entry: './src/app.js',
  output: {
    path: './dist',
    filename: 'app.bundle.js',
    library: 'pccp'
  },
  plugins: [],
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      }
    ]
  }

}
