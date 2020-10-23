var webpack = require('webpack');
var path    = require('path');
var combineLoaders = require('webpack-combine-loaders');
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

// where will webpack bundle FROM
var SRC_DIR  = path.resolve(__dirname, 'playcast-ui/src');

// where will webpack bundle TO
var DIST_DIR = path.resolve(__dirname, 'playcast-ui/build');



var config = {
    mode: 'production',
    // entry file for webpack
    entry: SRC_DIR + '/app/root.js',
    // the configuration object 
    output: {
        // where is the bundle file going 
        path: DIST_DIR + '/app',
        // name of the file
        filename: 'bundle.js',
        /*
        Because this is a development enviroment, we have to 
        tell webpack what would be our public folder on a prod
        enviroment.
        */
        publicPath: '/'
    },/*
    devServer: {
        open: false,
        hot: true,
        contentBase: DIST_DIR,
        historyApiFallback: true,
    },*/
    module: {
        rules: [
            {
                test: /\.js$/,
                include: SRC_DIR,
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                include: SRC_DIR,
                loader: combineLoaders([
                    {
                      loader: 'style-loader'
                    }, {
                      loader: 'css-loader',
                      query: {
                        modules: true,
                        localIdentName: '[path]___[name]__[local]___[hash:base64:5]'
                      }
                    }
                ])
            }         
        ]
    },
    plugins: [
        /*
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production'),
        }),
        new BundleAnalyzerPlugin()
        */
    ]
}

module.exports = config;