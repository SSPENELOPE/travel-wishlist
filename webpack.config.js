const Dotenv = require('dotenv-webpack');
const path = require('path');

module.exports = {
    entry: {
        main: './js/script.js',
        file1: './js/persistance.js',
      },
      output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
      },
    mode: 'development', // or 'production' for minified output
    plugins: [
        new Dotenv(),
    ],
};