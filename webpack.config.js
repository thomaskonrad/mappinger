var path = require('path'),
    srcPath = path.join(__dirname, 'src'),
    wwwPath = path.join(__dirname, 'build'),
    pkg = require('./package.json'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    context: srcPath,
    entry: {
        'app': path.join(srcPath, 'index.ts'),
        'vendors': path.join(srcPath, 'vendors.ts'),
        'style': path.join(srcPath, 'index.scss')
    },
    output: {
        path: wwwPath,
        filename: '[name]-[hash:6].js',
        sourceMapFilename: '[file].map'
    },
    debug: true,
    devtool: 'source-map',
    module: {
        loaders: [{
            test: /\.ts$/,
            loader: 'ts',
            exclude: [
                /node_modules/
            ]
        }, {
            test: /\.json$/,
            loader: "json"
        }, {
            test: /\.html$/,
            loader: 'raw'
        }, {
            test: /\.scss$/,
            loader: "style!css!autoprefixer?browsers=last 2 versions!sass"
        }],
        noParse: [/angular2\/bundles\/.+/],
    },
    resolve: {
        extensions: ['', '.ts', '.js', '.html', '.scss']
    },
    plugins: [
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
