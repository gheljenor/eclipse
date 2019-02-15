const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const config = require("./webpack");

config.mode = "production";

config.plugins.push(new MiniCssExtractPlugin());

config.module.rules.forEach((rule) => {
    if (!rule.test.test("index.pcss")) { return; }
    rule.use[0] = MiniCssExtractPlugin.loader;
});

module.exports = config;
