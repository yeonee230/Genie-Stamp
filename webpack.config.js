const path = require("path");

module.exports = {
  entry: "./src/client/js/board.js",
  mode: "development",
  output: {
    filename: "board.js",
    path: path.resolve(__dirname, "dist"),
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
    ],
  },
};
