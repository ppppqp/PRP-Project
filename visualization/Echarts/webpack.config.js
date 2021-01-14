const path = require('path');
module.exports = {
  mode: 'development',
  entry: path.join(__dirname, 'src'),
  watch: true,
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/dist/',
    filename: "main.js",
  },
  module: {
    rules: [{
      test: /\.css$/,
      use:[
        "style-loader",
        "css-loader"
      ]
    }
  
  ]
  }
};