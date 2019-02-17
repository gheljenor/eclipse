const webpack = require("webpack");

const config = require("./webpack");

config.mode = "development";

config.devtool = "cheap-module-eval-source-map";

config.entry.push("webpack-hot-middleware/client");

config.output = {
    path: __dirname + "/dev",
    publicPath: "/",
    filename: "index.js"
};

config.devServer = {
    contentBase: "./dev",
    hot: true
};

config.plugins.unshift(new webpack.HotModuleReplacementPlugin());

module.exports = config;
