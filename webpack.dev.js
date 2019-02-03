const config = require("./webpack")("development");

config.devtool = "cheap-module-eval-source-map";

config.output = {
    path: __dirname + "/dev",
    publicPath: "/",
    filename: "index.js"
};

config.devServer = {
    contentBase: "./dev",
    hot: true
};

module.exports = config;
