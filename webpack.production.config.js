var webpack = require('webpack')

module.exports = {
  entry: './src/app.js',
  output: {
    path: './dist',
    filename: 'app.min.bundle.js',
    library: 'pccp'
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({ minimize: true })
  ],
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
