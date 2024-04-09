module.exports = {
    // 其他webpack配置...
    devServer: {
      proxy: {
        '/api': {
          target: 'http://localhost:8080.com',
          pathRewrite: {'^/api' : ''},
          changeOrigin: true
        }
      }
    }
  };