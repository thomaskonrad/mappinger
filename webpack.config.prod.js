var webpack = require("webpack"),
    webpackConfig = require('./webpack.config.js');

webpackConfig.plugins.concat([
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin()
]);

// remove source-maps
webpackConfig.devtool = 'none';

module.exports = webpackConfig;
