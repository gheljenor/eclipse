const Path = require("path");
const nodeExternals = require("webpack-node-externals");
const HappyPack = require("happypack");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

const config = require("./webpack");

delete config.entry;

config.mode = "development";

config.devtool = "inline-cheap-module-source-map";

config.target = "node";
config.externals = [nodeExternals()];

config.module.rules.forEach((rule) => {
    if (!rule.test.test("index.pcss")) { return; }
    rule.use.shift(); // removing style-loader or minicss-extract
    rule.use.pop(); // remove cache-loader
});

if (process.env.NODE_ENV === "coverage") {
    config.module.rules.push({
        test: /\.[jt]sx?/,
        include: Path.resolve("src"), // instrument only testing sources with Istanbul, after ts-loader runs
        loader: "istanbul-instrumenter-loader",
        enforce: "post",
    });
}

config.output = {
    devtoolModuleFilenameTemplate: "[absolute-resource-path]",
    devtoolFallbackModuleFilenameTemplate: "[absolute-resource-path]?[hash]"
};

config.plugins = config.plugins.filter((plugin) =>
    plugin instanceof HappyPack || plugin instanceof ForkTsCheckerWebpackPlugin
);

config.plugins.forEach((plugin) => {
    if (!(plugin instanceof HappyPack)) {
        return;
    }

    plugin.config.loaders = plugin.config.loaders.filter((loader) => loader.loader !== "cache-loader");

    if (plugin.config.id === "postcss") {
        plugin.config.loaders[0].loader = "css-loader/locals";
    }
});

delete config.optimization;

module.exports = config;
