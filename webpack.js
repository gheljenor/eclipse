/**
 * @file Created by Mikhail Silaev on 12.08.18.
 * @author Mikhail Silaev
 */

const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ManifestPlugin = require("webpack-manifest-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (mode = "development") => {
    const production = mode === "production";

    const entry = ["./src/ui/index.tsx"];
    !production && entry.push("webpack-hot-middleware/client");

    const plugins = [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            title: "Interface example",
            template: "./src/ui/index.html",
            xhtml: true
        }),
        new ManifestPlugin(),
    ];

    if (production) {
        plugins.push(new MiniCssExtractPlugin());
    }

    return {
        mode,
        entry,
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    exclude: /node_modules/,
                    use: [
                        {loader: "babel-loader"},
                        {loader: "ts-loader"}
                    ],
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
                    use: [
                        production ? MiniCssExtractPlugin.loader : "style-loader",
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
                    ]
                }
            ]
        },
        resolve: {
            extensions: ["*", ".js", ".jsx", ".ts", ".tsx"]
        },
        output: {
            path: __dirname + "/docs",
            publicPath: "/docs",
            filename: "index.js"
        },
        plugins
    };

};
