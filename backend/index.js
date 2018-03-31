import express from "express";
import bodyParser from "body-parser";
import path from "path";

import webpack from "webpack";
import webpackMiddleware from "webpack-dev-middleware";
import webpackHotMiddleware from "webpack-hot-middleware";
import webpackConfig from "../webpack.config.dev";

import auth from "./routes/auth";
import users from "./routes/users";
import homes from "./routes/homes";
import hosts from "./routes/hosts";
import trips from "./routes/trips";

let app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "src")));

// 后端的router
app.use("/api/auth", auth);
app.use("/api/users", users);
app.use("/api/homes", homes);
app.use("/api/hosts", hosts);
app.use("/api/trips", trips);

// 这里连接了前后端
const compiler = webpack(webpackConfig);
app.use(webpackHotMiddleware(compiler));
app.use(
  webpackMiddleware(compiler, {
    hot: true,
    publicPath: webpackConfig.output.publicPath,
    noInfo: true
  })
);

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "./index.html"));
});

app.listen(5000, () => console.log("running on localhost: 5000"));
