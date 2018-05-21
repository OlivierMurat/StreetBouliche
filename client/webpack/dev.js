const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const WriteFilePlugin = require("write-file-webpack-plugin");

const config = {
    devtool  : "source-map",
    entry    : path.resolve(__dirname, "..", "app", "index.js"),
    output   : {
        path         : path.resolve(__dirname, "..", "dist"),
        chunkFilename: "[name].bundle.js",
        filename     : "bundle.js",
        publicPath   : "/"
    },
    resolve  : {
        extensions: [".js", ".jsx", ".json", "*"],
        alias     : {
            createjs: "createjs/builds/1.0.0/createjs.js"
        }
    },
    module   : {
        rules: [
            {
                test   : /node_modules[/\\]createjs/,
                loaders: [
                    "imports-loader?this=>window",
                    "exports-loader?window.createjs"
                ]
            },
            {
                test      : /\.jsx?$/, use: [
                    {
                        loader : "babel-loader",
                        options: {
                            plugins: ["react-hot-loader/babel"]
                        }
                    }
                ], exclude: /node_modules/
            },
            {test: /\.css$/, use: ["style-loader", "css-loader"]},
            {test: /\.scss$/, use: ["style-loader", "css-loader", "sass-loader"]},
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
                test  : /\.(mp3|ogg)$/,
                loader: "file-loader"
            },
            {
                test: /\.(gif|png|jpe?g|svg)$/i,
                use : [
                    "file-loader",
                    {
                        loader : "image-webpack-loader",
                        options: {
                            bypassOnDebug: true
                        }
                    }
                ]
            }
        ]
    },
    devServer: {
        index             : "index.html",
        contentBase       : path.join(__dirname, "..", "dist"),
        compress          : true,
        port              : 3030,
        historyApiFallback: true
    },
    plugins  : [
        new CopyWebpackPlugin([
            {
                from: path.join(__dirname, "..", "public"),
                to  : path.join(__dirname, "..", "dist")
            }
        ]),
        new WriteFilePlugin({
            test: /\.(?:html|ico)$/
        })
    ]
};

module.exports = config;