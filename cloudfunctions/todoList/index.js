// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db=cloud.database();
const miniprogram = db.collection('text1');
const _ =db.command;
// 云函数入口函数
exports.main = async (event, context) => {
  if(event.type=="finish"){
try {
  return await miniprogram.where({
    _id:_.in(event.idList),
  }).update({
    data:{
      isDONE:true,
    }
  })
} catch (error) {
  console.log(error);
}
  }
  else{
    try {
      return await miniprogram.where({
        _id:_.in(event.idList),
      }).remove()
    } catch (error) {
      console.log(error);
    }

  }  }