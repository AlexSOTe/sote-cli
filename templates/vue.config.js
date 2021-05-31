const path = require('path')

console.log('当前运行环境：', process.env.NODE_ENV);
module.exports = {
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: '',
  indexPath: 'index.html',
  filenameHashing: true,
  lintOnSave: false, // process.env.NODE_ENV !== 'production',
  runtimeCompiler: false,
  transpileDependencies: [],
  productionSourceMap: true,
  crossorigin: undefined,
  parallel: require('os').cpus().length > 1,
  configureWebpack: config => {
    //console.log('config', config);
    config.entry = {
      app: [
        'babel-polyfill',
        './src/main.ts'
      ]
    }
    config.output = {
      path: path.resolve(__dirname, 'dist'),
      filename: 'js/[name].[hash].js',
      publicPath: '/',
      chunkFilename: 'js/[name].[chunkhash].js'
    }
  },
  chainWebpack: config => {

  },
  css: {
    extract: true,
    sourceMap: false
  },
  devServer: {
    port: 80,
  }
}
