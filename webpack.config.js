var path = require('path'),
    srcPath = path.join(__dirname, 'src'),
    wwwPath = path.join(__dirname, 'build'),
    pkg = require('./package.json'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    CopyWebpackPlugin = require('copy-webpack-plugin');
    LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');

module.exports = {
    context: srcPath,
    entry: {
        'app': path.join(srcPath, 'main.ts'),
        'style': path.join(srcPath, 'index.scss'),
        'polyfills': path.join(srcPath, 'polyfills.browser.ts')
    },
    output: {
        path: wwwPath,
        filename: '[name]-[hash:6].js',
        sourceMapFilename: '[file].map'
    },
    devtool: 'source-map',
    module: {
        loaders: [{
            test: /\.ts$/,
            loader: 'ts-loader',
            exclude: [
                /node_modules/
            ]
        }, {
            test: /\.json$/,
            loader: "json-loader"
        }, {
            test: /\.html$/,
            loader: 'raw-loader'
        }, {
            test: /\.scss$/,
            loader: "raw-loader!autoprefixer?browsers=last 2 versions!sass-loader"
        }],
        noParse: [/angular2\/bundles\/.+/],
    },
    resolve: {
        extensions: ['.ts', '.js', '.html', '.scss']
    },
    plugins: [
        new LoaderOptionsPlugin({
            debug: true
        }),
        new CopyWebpackPlugin([
            {from: 'static', to: 'static' }
        ]),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            pkg: pkg,
            template: path.join(srcPath, 'index.html')
        })
    ]
};
