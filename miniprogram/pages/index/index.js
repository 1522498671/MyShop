//index.js
// 引入封装请求方法request
import { request } from "../../request/index.js";
const app = getApp()

Page({
  data:{  
    //轮播图数组
    swiperList:[],
    //分类导航
    catesList:[],
    //楼层数据
    floorList:[],
    //设置轮播图属性值
    autoplay:true, 
    indicatorDots:true,  
    circular:true,
            
  },   
  //页面加载就会触发
  onLoad:function(options){
    //1.发送异步请求获取轮播图的数据，优化：可以通过es6的promise来解决问题
    // wx.request({
    //   url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata', 
    //   success:(res)=>{
    //     this.setData({
    //       swiperList:res.data.message
    //     })
    //   }
    // })
    //获取轮播图数据    
   
    // const Homes=wx.getStorageSync("homes");
      this.getswiperlist();
      //获取分类数据
      this.getcateslist();
      //获取楼层数据  
      this.getfloorlist();

  
  },
  //获取轮播图请求方法
  getswiperlist:function(){
    request({url:"/home/swiperdata"})
    .then(result=>{
      this.setData({  
        swiperList:result
      })    
    });
  },
    //获取分类导航数据请求方法
  getcateslist:function(){
    request({url:"/home/catitems"})
    .then(result=>{
      this.setData({  
        catesList:result
      }) 
    });    
  },
  //获取楼层数据请求方法
  getfloorlist:function(){
    request({ url:"/home/floordata"})
    .then(result=>{  
      this.setData({  
        floorList:result
      })
    });
  },
   
 

    
});
