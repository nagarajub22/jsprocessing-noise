const path = require('path');
const webpack = require('webpack');
const htmlPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.ts',
    devtool: 'inline-source-map',
    optimization: {
        splitChunks: {
            // include all types of chunks
            name: 'vendor',
            chunks: 'all',
        },
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    plugins: [
        new htmlPlugin({
            template: './src/index.html',
            filename: './index.html',
            inject: 'body'
        })
    ],
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, '../../dist'),
        clean: true,
    },
};