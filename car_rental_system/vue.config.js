module.exports = {
    devServer:{
      port:8080,//端口号，如果被占用，自增1
      host:"localhost",//主机名
      https:false,
      open:false,   //启动服务时自动打开浏览器
      proxy:{   //开发环境代理配置，解决跨域问题
        // '/dev-api':{
         [process.env.VUE_APP_BASE_API]:{
            //目标服务器地址，代理访问
            target: process.env.VUE_APP_SERVICE_URL,
            // target:'http://localhost:8080',
            changeOrigin:true,//开启代理服务器
            pathRewrite:{
              //   /dev-api/db.json最终会发送target/db.json
              //   将请求地址前缀 /dev-api替换为空
              // '^dev-api':'',
              ['^' +process.env.VUE_APP_BASE_API]:'',

            }
          }
      }
    },
    // // lineOnSave:false,//关闭格式检测
    // productionSourceMap:false,//打包时不会生成map文件，加快打包速度
}