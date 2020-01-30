const path = require("path");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { TsConfigPathsPlugin } = require('awesome-typescript-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WasmPackPlugin = require("@wasm-tool/wasm-pack-plugin");

module.exports = {
  entry: './src/index.tsx',
  output: {
    filename: 'index.js',
    path: __dirname + '/dist'
  },

  // Enable sourcemaps for debugging webpack's output.
  devtool: 'source-map',

  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: ['.ts', '.tsx', '.js', '.json'],
    plugins: [new TsConfigPathsPlugin(/* { configFileName, compiler } */)]
  },

  module: {
    rules: [
      { test: /\.tsx?$/, loader: 'awesome-typescript-loader' },
      { test: /\.wasm$/, loader: ['wasm-loader'],type: 'javascript/auto'},

      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' },

      {
        test: /\.s?[ac]ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader', options: { url: false, sourceMap: true } }
          // { loader: 'sass-loader', options: { sourceMap: true } }
        ]
      }
    ]
  },

  // When importing a module whose path matches one of the following, just
  // assume a corresponding global variable exists and use that instead.
  // This is important because it allows us to avoid bundling all of our
  // dependencies, which allows browsers to cache those libraries between builds.
  // externals: {
  //   "react": "React",
  //   "react-dom": "ReactDOM"
  // },

  plugins: [
    new MiniCssExtractPlugin({
      filename: 'style.css',
      path: __dirname + '/dist'
    }),
    // new WasmPackPlugin({
    //   crateDirectory: path.resolve(__dirname, "."),
    //   withTypeScript: true // this is new
    // }),
    new HtmlWebpackPlugin({
      inject: false,
      template: 'index.html',
      filename: 'index.html'
    }),
  ]
};
