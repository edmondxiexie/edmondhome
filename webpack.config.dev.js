import path from "path";
import webpack from "webpack";

export default {
  devtools: "eval-source-map",
  entry: [
    "webpack-hot-middleware/client",
    path.join(__dirname, "/frontend/index.js")
  ],
  output: {
    path: "/",
    publicPath: "/"
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: [
          path.join(__dirname, "frontend"),
          path.join(__dirname, "backend/common")
        ],
        loaders: ["react-hot", "babel"]
      },
      {
        test: /\.scss$/,
        loaders: ["style-loader", "css-loader", "sass-loader"]
      }
    ]
  },
  resolve: {
    extensions: ["", ".js", ".css", ".scss"]
  }
};
