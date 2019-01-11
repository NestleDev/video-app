const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    output: {
        filename: 'main.min.js'
    },
    mode: process.env.NODE_ENV,
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: "babel-loader",
                exclude: /node_modules/
            },
            {
                test: /\.hbs$/,
                loader: "handlebars-loader"
            }
        ]
    }
};
