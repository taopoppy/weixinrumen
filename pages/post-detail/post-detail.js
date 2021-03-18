// pages/post-detail/post-detail.js
import {postList} from '../../data/data.js'
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    postData:{}, // 文章对象
    collected:false, // 文章是否被收藏
    isPlaying:false,
    _pid:null, // 具体文章的pid，在UI中不显示，所以只用在js文件中，使用下划线标注
    _postsCollected:{},
    _mgr:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const postData = postList[options.pid] // 根据pid拿到详情页要显示的数据
    this.data._pid = options.pid // this.data._pid可以直接赋值，因为不需要根据这个字段渲染UI
    const postsCollected = wx.getStorageSync('posts_collected')
    console.log(postsCollected)
    
    if(postsCollected){
      this.data._postsCollected = postsCollected
    }
    
    let collected = postsCollected[this.data._pid]

    if(collected === undefined){
      // 如果undefined 说明文章从来没有被收藏过
      collected = false
    }

    this.setData({
      postData,
      collected,
      isPlaying: this.currentMusicIsPlaying()
    })

    const mgr = wx.getBackgroundAudioManager()
    this.data._mgr = mgr
    mgr.onPlay(this.onMusicStart)
    // mgr.onStop(this.onMusicStop)
    mgr.onPause(this.onMusicStop)
  },

  currentMusicIsPlaying(){
    if(app.gIsPlayingMusic && app.gIsPlayingPostId === this.data._pid ){
      return true
    }
    return false
  },

  onMusicStart(event){
    const mgr = this.data._mgr
    // mgr.onPlay(()=>{
    //   console.log(123)
    // })
    const music = postList[this.data._pid].music

    mgr.src = music.url
    mgr.title = music.title
    mgr.coverImgUrl = music.coverImg

    app.gIsPlayingMusic = true
    app.gIsPlayingPostId = this.data._pid
    
    this.setData({
      isPlaying:true
    })
  },

  onMusicStop(event){
    const mgr = this.data._mgr
    mgr.pause()
    app.gIsPlayingMusic = false
    app.gIsPlayingPostId = -1
    this.setData({
      isPlaying:false
    })
    // 音乐停止 - start
    // 音乐播放 - stop
  },

  async onShare(event){
    const result = await wx.showActionSheet({
      itemList: ['分享到QQ','分享到微信','分享到朋友圈']
    })
    console.log(result)
  },

  async onCollect(event){

    const postsCollected = this.data._postsCollected
    wx.getStorageSync('key')
    postsCollected[this.data._pid] = !this.data.collected


    this.setData({
      collected:!this.data.collected
    })

    wx.setStorageSync('posts_collected',postsCollected)
    // 根据是否收藏修改消息提示框中的内容
    wx.showToast({
      title: this.data.collected?'收藏成功':'取消收藏',
      duration: 3000
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})