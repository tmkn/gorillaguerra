const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        app: './src/bootstrap.tsx'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: [/node_modules/],
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'Gorilla Guerra',
            meta: {
                charset: { charset: 'utf-8' },
                viewport: 'width=device-width, initial-scale=1',
                description: 'A reimagination of QBasic Gorillas for the web'
            },
        })
    ],
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/'
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
        },
    },
};