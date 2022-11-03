const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    watch: true
}
module.exports = {
    mode: 'development',
    entry: './src/SongPageDb.js',
    output: {
        path: path.resolve(__dirname, 'javascript'),
        filename: 'Songs.js'
    },
    watch: true
}
module.exports = {
    mode: 'development',
    entry: './src/InstrumentPageDb.js',
    output: {
        path: path.resolve(__dirname, 'javascript'),
        filename: 'Instruments.js'
    },
    watch: true
}
module.exports = {
    mode: 'development',
    entry: './src/bluetoothConnection.js',
    output: {
        path: path.resolve(__dirname, 'javascript'),
        filename: 'bluetooth.js'
    },
    experiments: {
        topLevelAwait: true
    },
    watch: true
}
