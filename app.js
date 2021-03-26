// app.js当中包含了小程序整个程序的生命周期
App({
  // onLaunch是小程序启动后的生命周期
  onLaunch(){
    console.log("小程序启动")
  },
  gIsPlayingMusic:false,
  gIsPlayingPostId:-1,
  gBaseUrl:"http://t.talelin.com/v2/movie/" // 全局变量，请求基地址
})