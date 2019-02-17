const Path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ManifestPlugin = require("webpack-manifest-plugin");
const webpack = require("webpack");
const HappyPack = require("happypack");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

const happyThreadPool = HappyPack.ThreadPool({size: 5});

const cacheDir = process.env.NODE_ENV === "production" ? ".cache" : ".cache-dev";

module.exports = {
    entry: ["./src/ui/index.tsx"],
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "cache-loader",
                        options: {cacheDirectory: Path.resolve(cacheDir, "typescript")}
                    },
                    "happypack/loader?id=typescript"
                ],
            }, {
                test: /\.js$/,
                use: [
                    {
                        loader: "cache-loader",
                        options: {cacheDirectory: Path.resolve(cacheDir, "js")}
                    },
                    "happypack/loader?id=js"
                ],
                exclude: /node_modules/,
                enforce: "pre",
            }, {
                test: /\.(png|svg|jpg|jpeg|gif)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            outputPath: "images/",
                        },
                    },
                ],
            }, {
                test: /\.p?css$/,
                use: [
                    {
                        loader: "cache-loader",
                        options: {cacheDirectory: Path.resolve(cacheDir, "postcss")}
                    },
                    "style-loader",
                    "happypack/loader?id=postcss",
                ],
            },
        ],
    },
    resolve: {
        extensions: ["*", ".js", ".jsx", ".ts", ".tsx"],
    },
    output: {
        path: __dirname + "/docs",
        publicPath: "/eclipse/",
        filename: "index.[hash].js",
    },
    plugins: [
        new HappyPack({
            id: "js",
            threadPool: happyThreadPool,
            loaders: [
                "source-map-loader"
            ]
        }),
        new HappyPack({
            id: "typescript",
            threadPool: happyThreadPool,
            loaders: [
                {
                    loader: "ts-loader",
                    options: {happyPackMode: true},
                },
            ],
        }),
        new HappyPack({
            id: "postcss",
            threadPool: happyThreadPool,
            loaders: [
                {
                    loader: "css-loader",
                    options: {
                        url: true,
                        modules: true,
                        camelCase: true,
                        importLoaders: 1,
                        sourceMap: true,
                        exportOnlyLocals: true,
                        localIdentName: process.env.NODE_ENV === "production"
                            ? "[hash:base64]"
                            : "[path][name]__[local]",
                    },
                },
                "postcss-loader",
            ],
        }),
        new ForkTsCheckerWebpackPlugin({
            workers: ForkTsCheckerWebpackPlugin.TWO_CPUS_FREE,
            formatter: "codeframe",
            checkSyntacticErrors: true,
        }),
        new ManifestPlugin(),
        new HtmlWebpackPlugin({
            title: "Interface example",
            template: "./src/ui/index.html",
            xhtml: true,
        }),
        new webpack.HashedModuleIdsPlugin({
            hashFunction: "md4",
            hashDigest: "base64",
            hashDigestLength: 8,
        }),
    ],
    optimization: {
        runtimeChunk: true,
        splitChunks: {chunks: "all"},
    },
};
