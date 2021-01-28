module.exports = {
  publicPath: process.env.NODE_ENV === 'development' ? '/' : './',
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: false,
  // lintOnSave: process.env.NODE_ENV === 'development' ? 'error' : false,
  productionSourceMap: false,
  devServer: {
    open: true,
    host: '0.0.0.0',
    port: '8080'
    // proxy: {
    //   '/api': {
    //     target: '',
    //     ws: true,
    //     changeOrigin: true,
    //     pathRewrite: {
    //       '/api': ''
    //     }
    //   }
    // }
  }
  // configureWebpack: {
  //   externals: {
  //     'vue': 'Vue',
  //     'vuex': 'Vuex',
  //     'vue-router': 'VueRouter',
  //     'axios': 'axios',
  //     'element-ui': 'ELEMENT'
  //   }
  // }
}
