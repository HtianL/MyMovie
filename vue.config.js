module.exports = {
    //管理静态资源的路径
    publicPath: "/huaqianshu",
    //反向代理，解決跨域問題
    devServer: {
        proxy: {
            "/api": {
                target: "http://39.97.33.178",
                changeOrigin: true
            }
        }
    }

};