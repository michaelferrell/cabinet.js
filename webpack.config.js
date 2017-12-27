const path = require('path');
const webpack = require('webpack');
const wds_port = 4050;

const PATHS = {
    src: path.join(__dirname, 'src'),
    js: path.join(__dirname, 'src/js'),
    build: path.join(__dirname, 'dist'),
    devServer: path.join(__dirname, 'dev-server'),
    demo: path.join(__dirname, 'demo')
};

console.log('Webpack running with environment: ', process.env.NODE_ENV)

//default environment to production if not set
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'production';
}

//environment specific config
let includes = [PATHS.js]
let devtool = false
let output_path = PATHS.build
let entrypoint = PATHS.js + '/index.js'
let plugins = [new webpack.EnvironmentPlugin(['NODE_ENV'])]

if (process.env.NODE_ENV == 'development') {
  includes.push(PATHS.devServer)
  devtool = 'eval-source-map'
  output_path = PATHS.devServer + '/dist'
  entrypoint = PATHS.devServer + '/src/dev-server.js'
  plugins.push(new webpack.HotModuleReplacementPlugin())

} else if (process.env.NODE_ENV == 'demo') {
  includes.push(PATHS.demo)
  output_path = PATHS.demo + '/dist'
  entrypoint = PATHS.demo + '/src/demo.js'
}

let config = {
  // entrypoint to build output
  entry: [entrypoint],
  devServer: {
    host: '0.0.0.0',
    port: wds_port,
    hot: true,
    inline: true,
    historyApiFallback: true,
    contentBase: PATHS.devServer + '/dist'
  },
  output: {
    path: output_path,
    filename: 'main.js',
    library: 'cabinet',
    libraryTarget: 'umd'
  },
  plugins: plugins,
  resolve: {
    extensions: [".js", ".json"]
  },
  devtool: devtool,
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [
          {
            loader: 'babel-loader'
          }
        ],
        include: includes
      },
    ]
  }
};

module.exports = config;