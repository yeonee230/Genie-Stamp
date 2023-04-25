const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const Base_url = "./src/client/js/";

module.exports = {
  entry: {
    board: Base_url + "board.js",
    boardRe: Base_url + "boardRe.js",
    setting: Base_url + "setting.js",
  },
  mode: "development",
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/styles.css",
    }),
  ],
  watch: true,
  output: {
    filename: "js/[name].js",
    path: path.resolve(__dirname, "assets"),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env", { targets: "defaults" }]],
          },
        },
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
    ],
  },
};
