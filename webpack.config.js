module.exports = {
    entry: "./public/src/app.js",
    output: {
        path: __dirname + '/public/dist',
        filename: "bundle.js"
    },
    watch: true,
    devtool: 'source-map',
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: "babel-loader",
            query: {
                presets: ['es2015']
            }
        }]
    }
};
