const path = require("path");
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: path.resolve(__dirname, "src/index.jsx"),
    mode: "development",
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)?$/,
                exclude: /node_modules/, //don't test node_modules folder
                use: {
                    loader: "babel-loader"
                },
            },
            {   // Preprocess css files
                test: /\.css$/,
                exclude: /node_modules/,
                use: ['style-loader', 'css-loader'], // order matters
            },
            {   //Allows use of images
                test: /\.(png|jpe?g|svg|gif|ico)$/i,
                use: ['file-loader'],
            },
        ]
    },
    plugins: [
          // new webpack.HotModuleReplacementPlugin(),
          // new webpack.ProvidePlugin({
          //   'Promise': 'es6-promise',
          //   'window.fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
          // }),
          // new webpack.NoErrorsPlugin(),
          new HtmlWebpackPlugin({
            inject: true,
            hash: true,
            title: 'Sample React Application',
            template: path.resolve(__dirname, "public/index.html"),
            favicon: path.resolve(__dirname, "public/favicon.ico"),
            manifest: path.resolve(__dirname, "public/manifest.json")
          })

    ],
    devServer: {
        historyApiFallback: true,
        hot: true,
        port: 3500,
        open: true
    },
    externals: {
        // global app config object
        config: JSON.stringify({
            apiUrl: 'http://localhost:8080'
        })
    }
}
