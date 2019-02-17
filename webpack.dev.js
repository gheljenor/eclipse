const webpack = require("webpack");

const config = require("./webpack");

config.mode = "development";

config.devtool = "cheap-module-eval-source-map";

config.output.publicPath = "/";

config.devServer = {
    contentBase: "./dev",
    hot: true
};

config.plugins.unshift(new webpack.HotModuleReplacementPlugin());

module.exports = config;
