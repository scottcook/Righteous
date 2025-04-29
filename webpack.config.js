const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    alias: {
      // Alias for GSAP premium plugins
      'gsap/SplitText': path.resolve(__dirname, 'lib/gsap-premium/src/SplitText.js'),
      'gsap/ScrollTrigger': path.resolve(__dirname, 'lib/gsap-premium/src/ScrollTrigger.js'),
      'gsap/ScrollToPlugin': path.resolve(__dirname, 'lib/gsap-premium/src/ScrollToPlugin.js'),
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
    },
    compress: true,
    port: 3002,
    hot: true,
    open: true,
  }
}; 