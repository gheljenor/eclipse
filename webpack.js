const HtmlWebpackPlugin = require("html-webpack-plugin");
const ManifestPlugin = require("webpack-manifest-plugin");

module.exports = {
    entry: ["./src/ui/index.tsx"],
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: [
                    {loader: "ts-loader"}
                ],
            }, {
                test: /\.js$/,
                use: ["source-map-loader"],
                exclude: /node_modules/,
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
                    "style-loader",
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
        publicPath: "/eclipse",
        filename: "index.js"
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "Interface example",
            template: "./src/ui/index.html",
            xhtml: true
        }),
        new ManifestPlugin(),
    ]
};
