const Path = require("path");
const Os = require("os");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

const config = require("./webpack");

config.mode = "production";

config.plugins.push(
    new MiniCssExtractPlugin({
        filename: "[name].[contenthash].css",
        chunkFilename: "[id].[contenthash].css"
    }),
    new TerserPlugin({
        cache: Path.resolve(".cache/terser"),
        parallel: Os.cpus().length - 2,
    }),
    new BundleAnalyzerPlugin({
        analyzerMode: "static",
        defaultSizes: "parsed",
        openAnalyzer: false,
        reportFilename: "stats/index.html",
        generateStatsFile: true,
        statsFilename: "stats/stats.json"
    }),
);

config.module.rules.forEach((rule) => {
    if (!rule.test.test("index.pcss")) { return; }
    rule.use[1] = MiniCssExtractPlugin.loader;
});

module.exports = config;
