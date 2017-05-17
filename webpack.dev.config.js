const path = require('path')
const webpack = require('webpack')

module.exports = {
    context: path.resolve(__dirname, './src'),
    entry: {
        "main": [
            'react-hot-loader/patch',
            'webpack-dev-server/client?http://localhost:8080',
            'webpack/hot/only-dev-server',
            './index.dev.js',
        ],
        "reveal.pdf": './reveal.pdf.js'
    },
    output: {
        path: path.resolve(__dirname, './public/'),
        filename: '[name].bundle.js',
        publicPath: '/'
    },
    module: {
        rules: [{
            test: /\.js$/,
            use: [{
                loader: 'babel-loader',
                options: {
                    "presets": [
                        "react"
                    ],
                    "plugins": [
                        "react-hot-loader/babel"
                    ]
                }
            }],
            exclude: /node_modules/,
        }, {
            test: /\.css$/,
            use: ['style-loader', 'css-loader?modules'],
        }, {
            test: /\.(sass|scss)$/,
            use: [
                'style-loader',
                'css-loader',
                'sass-loader',
            ]
        }, {
            test: /\.(png|mp4|webm)$/,
            use: [
                'file-loader?name=[name].[ext]&outputPath=asset/'
            ]
        }],
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: path.resolve(__dirname, './public/'),
        //compress: true,
        historyApiFallback: true,
        hot: true,
        inline: true,
        //port: 8080,
        publicPath: '/'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        // enable HMR globally

        new webpack.NamedModulesPlugin(),
        // prints more readable module names in the browser console on HMR updates
    ],
}
