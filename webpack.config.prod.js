var webpack = require("webpack"),
    webpackConfig = require('./webpack.config.js');

webpackConfig.plugins.concat([
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin()
]);

// remove source-maps
webpackConfig.debug = false;
webpackConfig.devtool = 'none';

module.exports = webpackConfig;
