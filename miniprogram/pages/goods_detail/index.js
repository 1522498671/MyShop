// pages/goods_detail/index.js
//引入请求方法
import {request} from "../../request/index.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsDetail:{},
    goods_id:''
  },
  //商品信息对象
  goodsInfo:'',
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {goods_id}=options;
    this.setData({
      goods_id:goods_id
    })
    this.getGoodsDetail();
  },
  async getGoodsDetail(){
    const result=await request({url:'/goods/detail?goods_id='+this.data.goods_id})
    // console.log(result);
    this.goodsInfo=result; 
    this.setData({
      goodsDetail:{
        pics:result.pics,  
        pics_sma_url:result.pics_sma_url,
        goods_price:result.goods_price,
        goods_name:result.goods_name,
        goods_introduce:result.goods_introduce.replace(/.\webp/g,'.jpg')
      }
    })  
  },
  handlePreviewImage(e){
    const urls=this.data.goodsDetail.pics.map(v=>v.pics_mid)
    const {current}=e.currentTarget.dataset;
    wx.previewImage({
      current, //解构赋值 当前显示图片的http链接
      urls:urls // 需要预览的图片http链接列表
    })    
  },
  //点击客服事件
  handleContact(e){  
    console.log(e.detail.path)
  },    
  //加入购物车   
  handleAddShop(){   
    const cart=wx.getStorageSync('cart')||[]; 
    //v表示遍历后的元素。
    //当缓存中v.good_id也就是 this.goodsInfo.goods_id
    //当两者相等时，说明已经购物车中已经添加该商品，goodsInfo.num++；
    //否则表示该商品从未添加goodsInfo.num=1；
    const index=cart.findIndex(v=>v.goods_id===this.goodsInfo.goods_id);
    if(index===-1){          
      this.goodsInfo.num=1;       
      this.goodsInfo.checked=true 
      // cart.push(this.goodsInfo?this.goodsInfo:''); 
      cart.push(this.goodsInfo);
    }else{     
      cart[index].num++;  
    }  
    wx.setStorageSync('cart',cart);
    wx.showToast({
      title: '加入购物车',
      icon:'success',
      mask:true,
      duration:1500,
    })  

  }
})