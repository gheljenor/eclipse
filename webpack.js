/**
 * @file Created by Mikhail Silaev on 12.08.18.
 * @author Mikhail Silaev
 */

const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ManifestPlugin = require("webpack-manifest-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = (mode = "development") => {
    const production = mode === "production";

    const entry = ["./src/ui/index.tsx"];
    !production && entry.push("webpack-hot-middleware/client");

    const extractCSS = production ? new ExtractTextPlugin("styles.css") : null;

    const buildCss = [
        {
            loader: "css-loader",
            options: {
                url: true,
                modules: true,
                camelCase: true,
                importLoaders: 1,
                sourceMap: true
            }
        },
        "postcss-loader"
    ];

    const plugins = [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            title: "Interface example",
            template: "./src/ui/index.html",
            xhtml: true
        }),
        new ManifestPlugin(),
    ];

    extractCSS && plugins.unshift(extractCSS);

    return {
        mode,
        entry,
        module: {
            rules: [
                {
                    test: /\.(tsx?)$/,
                    loader: "babel-loader",
                }, {
                    test: /\.js$/,
                    use: ["source-map-loader"],
                    enforce: "pre"
                }, {
                    test: /\.(png|svg|jpg|jpeg|gif)$/,
                    use: [
                        {
                            loader: "file-loader",
                            options: {
                                outputPath: "images/"
                            }
                        }
                    ]
                }, {
                    test: /\.p?css$/,
                    use: production ? extractCSS.extract(buildCss) : ["style-loader", ...buildCss]
                }
            ]
        },
        resolve: {
            extensions: ["*", ".js", ".jsx", ".ts", ".tsx"]
        },
        output: {
            path: __dirname + "/dist",
            publicPath: "/",
            filename: "index.js"
        },
        plugins,
        devServer: {
            contentBase: "./dist",
            hot: true
        }
    };

};
