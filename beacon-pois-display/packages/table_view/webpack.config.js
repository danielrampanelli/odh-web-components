const path = require('path')

module.exports = {
  mode: 'production',
  entry: './src/table.js',
  output: {
    path: path.resolve(__dirname + '/../../', 'dist'),
    filename: 'table.min.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: 'css-loader'
      },
      {
        test: /\.svg$/,
        use: 'svg-inline-loader'
      }
    ]
  }
}
