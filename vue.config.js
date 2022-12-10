const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  pwa: {
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black-transculent',
    themeColor: '#212529'
  },
  transpileDependencies: true,
  pages: {
    index: {
      entry: 'src/main.js',
      title: 'Wishr',
    },
  },
  devServer: {
    https: true,
    proxy: {
      "/api": {
        target: "http://127.0.0.1:9191",
        changeOrigin: true
      },
    },
  },
})
