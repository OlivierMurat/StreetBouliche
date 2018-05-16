const path = require("path");
const webpack = require("webpack");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const HtmlWebpackConfig = new HtmlWebpackPlugin({
    template: path.resolve(__dirname, "..", "public", "index.html"),
    filename: "index.html",
    inject  : "body"
});

const config = {
    devtool     : "source-map",
    entry       : path.resolve(__dirname, "..", "app", "index.js"),
    output      : {
        path         : path.resolve(__dirname, "..", "..", "dist"),
        chunkFilename: "[name].bundle.js",
        filename     : "bundle.js",
        publicPath: "/"
    },
    resolve     : {
        extensions: [".js", ".jsx", "*"]
    },
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache    : true,
                parallel : true,
                sourceMap: true // set to true if you want JS source maps
            }),
            new OptimizeCSSAssetsPlugin({})
        ]
    },
    module      : {
        rules: [
            {test: /\.jsx?$/, use: ["babel-loader"], exclude: /node_modules/},
            {test: /\.css$/, use: ["style-loader", "css-loader"]},
            {
                test: /\.scss$/, use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader"
                    },
                    {
                        loader : "sass-loader",
                        options: {
                            sourceMap: true
                        }
                    }
                ]

            },
            {
                test  : /\.woff(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url?limit=10000&mimetype=application/font-woff"
            }, {
                test  : /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url?limit=10000&mimetype=application/font-woff"
            }, {
                test  : /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url?limit=10000&mimetype=application/octet-stream"
            }, {
                test  : /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                loader: "file"
            }, {
                test  : /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url?limit=10000&mimetype=image/svg+xml"
            },
            {
                test: /\.(gif|png|jpe?g|svg)$/i,
                use : [
                    "file-loader",
                    {
                        loader : "image-webpack-loader",
                        options: {
                            mozjpeg : {
                                progressive: true,
                                quality    : 65
                            },
                            // optipng.enabled: false will disable optipng
                            optipng : {
                                enabled: false
                            },
                            pngquant: {
                                quality: "65-90",
                                speed  : 4
                            },
                            gifsicle: {
                                interlaced: false
                            },
                            // the webp option will enable WEBP
                            webp    : {
                                quality: 75
                            }
                        }
                    }
                ]
            }
        ]
    },
    plugins     : [
        new webpack.DefinePlugin({
            "process.env.NODE_ENV": JSON.stringify("production")
        }),
        new MiniCssExtractPlugin({
            filename     : "[name].css",
            chunkFilename: "[id].css"
        }),
        HtmlWebpackConfig
        // new CopyWebpackPlugin([ {
        //     from: path.resolve(__dirname, '..', 'public', 'dict.json'),
        //     to: path.resolve(__dirname, '..', 'build', 'dict.json')
        // } ])
    ]
};

module.exports = config;