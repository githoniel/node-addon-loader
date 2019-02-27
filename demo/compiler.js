const del = require('del')
const path = require('path')
const webpack = require('webpack')

module.exports = function compiler(name, config = {}) {
    return del(path.resolve(__dirname, `./__expected__/${name}`)).then(() => {
        config = {
            target: 'node',
            context: path.resolve(__dirname, './config'),
            entry: `./${name}/entry.js`,
            output: {
                path: path.resolve(__dirname, `./__expected__/${name}`),
                filename: 'bundle.js',
                libraryTarget: 'commonjs2'
            },
            module: {
                rules: [
                    {
                        test: /\.node$/,
                        use: {
                            loader: '../../index',
                            options: config.loader ? config.loader.options : {}
                        }
                    }
                ]
            }
        }

        const compilerer = webpack(config)

        return new Promise((resolve, reject) => {
            compilerer.run((err, stats) => {
                if (err) reject(err)

                resolve(stats)
            })
        })
    })
}
