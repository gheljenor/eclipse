const Path = require("path");
const nodeExternals = require("webpack-node-externals");

const config = require("./webpack");

delete config.entry;

config.mode = "development";

config.devtool = "inline-cheap-module-source-map";

config.target = "node";
config.externals = [nodeExternals()];

config.module.rules.forEach((rule) => {
    if (!rule.test.test("index.pcss")) { return; }
    rule.use.shift(); // removing style-loader or minicss-extract
    rule.use[0].loader = "css-loader/locals";
});

if (process.env.NODE_ENV === "coverage") {
    config.module.rules.unshift({
        test: /\.[jt]sx?/,
        include: Path.resolve("src"), // instrument only testing sources with Istanbul, after ts-loader runs
        loader: "istanbul-instrumenter-loader"
    });
}

config.output = {
    devtoolModuleFilenameTemplate: "[absolute-resource-path]",
    devtoolFallbackModuleFilenameTemplate: "[absolute-resource-path]?[hash]"
};

module.exports = config;
