// const path = require('path');
// module.exports = {
//     entry: './public/src/app.js',
//     output: {
//         path: './public/dist',
//         filename: 'bundle.js'
//     },
//     devtool: 'source-map',
//     module: {
//         loaders: [{
//             test: /\.js$/,
//             exclude: /node_modules/,
//             loader: 'babel-loader',
//             query: {
//                 presets: ['es2015']
//             }
//         }]
//     }
// };

module.exports = {
    context: __dirname,
    entry: "./public/src/app.js",
    output: {
        path: __dirname + "/public/dist",
        filename: "bundle.js"
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
                presets: ['es2015']
            }
        }]
    }
}
