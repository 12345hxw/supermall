module.exports={
  configureWebpack:{
    resolve:{
      //给src下的文件夹取别名
      // src默认已经配置了 @
      alias:{
        'assets':'@/assets',
        'common':'@/common',
        'components':'@/components',
        'network':'@/network',
        'views':'@/views',
        //router，store不需要，只需要在main.js中引用一次

      }
    }
  }
}


