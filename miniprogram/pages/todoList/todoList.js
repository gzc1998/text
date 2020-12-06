const db=wx.cloud.database();
const miniprogram = db.collection('text1');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputValue:'',
    List:[],
    isDONE:false,
    checkList:[],
  },
  getinputValue(e){
    this.setData({
      inputValue:e.detail.value,
    })
  },
  add(){
    if(this.data.inputValue){
      miniprogram.add({
        data:{
          title:this.data.inputValue,
          isGO:true,
        isDONE:false,
        }
      }).then(res=>{
        console.log(res);
        this.setData({
          inputValue:'',
        })
        this.getTodolist();
      }).catch(err=>{
        console.log(err);
      })
      wx.showToast({
        title: '操作成功！',
        icon:"success",
        duration:2000,
      })
    }
    else{
      wx.showToast({
        title: '输入的内容不能为空！',
        icon:"none",
        duration:2000,
      })
    }
  },
  getTodolist(){
    miniprogram.where({
  isGO:true,
  isDONE:this.data.isDONE,
}).get().then(res=>{
console.log(res);
this.setData({
List:res.data,
})
}).catch(err=>{
  console.log(err);
})
  },
  finish(e){
    let id=e.target.dataset.id;
    miniprogram.doc(id).update({
      data:{
        isDONE:true,
      }
    }).then(res=>{
      console.log(res);
      this.getTodolist();
      wx.showToast({
        title: '完成！',
        icon:"success",
        duration:2000,
      })
    }).catch(err=>{
      console.log(err);
    })
  },
  checkbosChange(e){
this.setData({
  checkList:e.detail.value,
})
  },
  bacchandle(e){
    let type=e.target.dataset.type;
    wx.cloud.callFunction({
      name:"todoList",
      data:{
        type:type,
        idList:this.data.checkList,
      }
    }).then(res=>{
this.getTodolist();
    }).catch(err=>{
      console.log(err);
    })
  },
  delete(e){
    let id=e.target.dataset.id;
    miniprogram.doc(id).remove().then(res=>{
      console.log(res);
      this.getTodolist();
      wx.showToast({
        title: '移除成功！',
        icon:"success",
        duration:2000,
      })
    }).catch(err=>{
      console.log(err);
    })
  },
  switchisDONE(e){
this.setData({
  isDONE:e.detail.value,
})
this.getTodolist();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
this.getTodolist();
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