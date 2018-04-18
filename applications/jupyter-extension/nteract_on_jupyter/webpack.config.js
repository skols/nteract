// @flow

const configurator = require("@nteract/webpack-configurator");

const LodashModuleReplacementPlugin = require("lodash-webpack-plugin");
const webpack = require("webpack");
const path = require("path");

const nodeEnv = process.env.NODE_ENV || "development";
const isProd = nodeEnv === "production";

const ASSET_PATH = process.env.ASSET_PATH || "/nteract/static/lib";

module.exports = {
  mode: isProd ? "production" : "development",
  devtool: isProd ? "hidden-source-map" : "cheap-eval-source-map",
  entry: {
    app: "./app/index.js",
    "editor.worker": "monaco-editor/esm/vs/editor/editor.worker.js"
  },
  target: "web",
  output: {
    // Note: this gets overriden by our use of __webpack_public_path__ later
    publicPath: ASSET_PATH
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: configurator.exclude,
        loader: "babel-loader"
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  resolve: {
    mainFields: ["nteractDesktop", "module", "main"],
    extensions: [".js", ".jsx"],
    alias: configurator.mergeDefaultAliases()
  },
  plugins: [
    new LodashModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      "process.env.ASSET_PATH": JSON.stringify(ASSET_PATH)
    }),
    new webpack.IgnorePlugin(/\.(css|less)$/),
    new MonacoWebpackPlugin(),

    //  new webpack.IgnorePlugin(/\.(css|less)$/),
    new webpack.IgnorePlugin(
      /^((fs)|(path)|(os)|(crypto)|(source-map-support))$/,
      /vs\/language\/typescript\/lib/
    )
  ]
};
