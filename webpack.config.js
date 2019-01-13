const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin')
var HtmlMinifierPlugin = require('html-minifier-webpack-plugin');

module.exports = {
    mode: "production",
    entry: {
        'app.js': path.resolve(__dirname, 'src/index.js'),
    },
    output: {
        filename: '[name]',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                     MiniCssExtractPlugin.loader,
                    'css-loader',
                ],
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                        }
                    }
                ]
            },
            {
                test: /.*\.(svg|gif|png|jpe?g)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '/img/[name].[ext]',
                        }
                    },
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            mozjpeg: {
                                progressive: true,
                                quality: 65
                            },
                        },
                    }
                ]
            },
            {
                test: /\.woff2?$|\.ttf$|\.eot$/,
                exclude: /node_modules/,
                loader: 'file-loader',
                options: {
                    name: 'fonts/[name].[ext]',
                }
            }
        ]
    },
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: false
            }),
            new OptimizeCSSAssetsPlugin({})
        ]
    },
    externals: {
        $: "jquery",
        jQuery: "jquery",
        'window.jQuery': 'jquery',
        'window.$': 'jquery',
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new MiniCssExtractPlugin({
            filename: "app.css"
        }),
        new HtmlMinifierPlugin({
            removeComments: true,
            collapseWhitespace: true,
            removeRedundantAttributes: true,
            removeEmptyAttributes: true
        }),
        new CopyWebpackPlugin([
            { from: 'src/html5up/css/noscript.css', to: 'noscript.css' },
            { from: 'src/favicon.ico', to: 'favicon.ico'},
            { from: 'src/humans.txt', to: 'humans.txt'},
        ])
    ],
    resolve: {
        alias: {
            jquery: "jquery/src/jquery"
        }
    }
};