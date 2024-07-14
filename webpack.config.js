const path = require("path");
const Dotenv = require("dotenv-webpack");

module.exports = {
  resolve: {
    fallback: {
      os: require.resolve("os-browserify/browser"),
      path: require.resolve("path-browserify"),
    },
  },
  entry: "./src/index.js", // Adjust the entry point as needed
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
    ],
  },
  plugins: [new Dotenv()],
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    compress: true,
    port: 9000,
  },
};
