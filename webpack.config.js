const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractSass = new ExtractTextPlugin({
    filename: "[name].bundle.css",
    disable: process.env.NODE_ENV === "development"
});

module.exports = {
    module: {
        rules: [{
            test: /\.scss$/,
            use: extractSass.extract({
                use: [{
                    loader: "css-loader?url=false"
                }, {
                    loader: "sass-loader"
                }],
                    //use style-loader in development
                    fallback: "style-loader"
            })
        }, 
        {
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/
        },
        {
            test    : /\.(png|jpg|svg)$/,
            include : path.join(__dirname, 'img'),
            loader  : 'url-loader?limit=30000&name=images/[name].[ext]'
        }] // inline base64 URLs for <=30k images, direct URLs for the rest
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            Popper: ['popper.js', 'default'],
        }),
        extractSass
    ],
    devtool: 'source-map',
    output: {
        publicPath: "http://localhost:8080"
    }
};