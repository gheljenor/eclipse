// you can use this file to add your custom webpack plugins, loaders and anything you like.
// This is just the basic way to add additional webpack configurations.
// For more information refer the docs: https://storybook.js.org/configurations/custom-webpack-config

// IMPORTANT
// When you add this file, we won't add the default configurations which is similar
// to "React Create App". This only has babel loader to load JavaScript.

const config = require("../webpack.dev");
const HappyPack = require("happypack");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

module.exports = base => {
    base.module.rules = [
        ...base.module.rules,
        ...config.module.rules
    ];

    base.resolve.extensions = config.resolve.extensions;

    base.plugins.push(...config.plugins.filter((plugin) =>
        plugin instanceof HappyPack || plugin instanceof ForkTsCheckerWebpackPlugin
    ));

    return base;
};
