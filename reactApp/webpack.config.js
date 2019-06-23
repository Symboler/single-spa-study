const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        main: './src/singleSpaEntry.js',
        store: './src/store.js'
    },

    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'reactApp'),
        libraryTarget: 'amd',
        library: 'reactApp'
    },

    plugins: [
        new CopyWebpackPlugin([
            {from: path.resolve(__dirname, 'public/project.json')},
        ]),
	],

    module: {
        rules: [
            {
                test: /\.js/,
                use: ['babel-loader?cacheDirectory'],
                exclude: /node_modules/,
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            publicPath: '/reactApp/',
                        }
                    }
                ]
            }
        ],
    },

    mode: 'development',

    devtool: 'eval-source-map',
    // devtool: 'none',

};
