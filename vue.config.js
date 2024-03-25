const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})
// vue.config.js
module.exports = {
  devServer: {
    proxy: {
      '/chatgpt-api': {
        target: 'http://localhost:3001', // 后端服务的地址
      },
    },
  },
};
