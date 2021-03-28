// pages/more-movie/more-movie.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    movies:[],
    _type:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const type = options.type // 拿到页面传递来的类型数据
    this.data._type = type
    wx.request({
      url: app.gBaseUrl + type,
      data:{
        start:0,
        count:12
      },
      success:(res)=>{
        console.log(res)
        this.setData({
          movies:res.data.subjects
        })
      }
    }) 
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    let title = '电影'
    switch(this.data._type){
      case 'in_theaters':
        title='正在热映'
        break
      case 'coming_soon':
        title = '即将上映'
        break
      case 'top250':
        title = '豆瓣Top250'
        break
    }
    // 通过js设置Page的标题，一般是复用页面要根据参数的不同而显示不同的标题
    wx.setNavigationBarTitle({
      title: title,
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
   
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    console.log("用户正在下拉")
    wx.request({
      url: app.gBaseUrl + this.data._type,
      data:{
        start:0,
        count:12,
      },
      success:(res)=>{
        this.setData({
          movies:res.data.subjects
        })
        wx.stopPullDownRefresh() // 主动去关闭下拉刷新的动画效果
      }
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    wx.showNavigationBarLoading() // 显示加载
    wx.request({
      url: app.gBaseUrl + this.data._type,
      data:{
        start: this.data.movies.length,
        count:12
      },
      success:(res)=>{
        console.log(res)
        this.setData({
          movies:this.data.movies.concat(res.data.subjects)
        })
        wx.hideNavigationBarLoading() // 隐藏加载
      }
    })  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})