// pages/goods_pay/index.js
import {request} from "../../request/index.js"
Page({
  /**
   * 页面的初始数据
   */
  data: {
    //接收本地缓存中的地址
    address:'',
    //购物车的数据
    cart:[],
    //全选状态
    checkedall:false,
    //总价格
    totalPrice:'',
    //总数量
    totalNum:''
  },
  token:'',
  onShow(){  
    //获取本地缓存地址
    let address=wx.getStorageSync("address")||[];
    address.all=address.provinceName+address.countyName+address.detailInfo
      // 获取本地购物车缓存数据
      let cart=wx.getStorageSync("cart")||[];
      let totalPrice=0;  
      let totalNum=0;  
      cart=cart.filter(v=>v.checked)
      cart.forEach(v=>{
        totalPrice+=v.num*v.goods_price;
        totalNum+=v.num; 
      });
      this.setData({
        totalNum,
        totalPrice,     
        cart, 
        address
      });
      const token=wx.getStorageSync("token");
      this.token=token;
  },
  async handlePayBtn(e){
    if(!this.token){
        wx.navigateTo({     
          url: '/pages/auth/index',
          success: (result)=>{
          },
          fail: ()=>{},
          complete: ()=>{}
        });
      }else{
        const order_price=this.data.totalPrice;
        const consignee_addr=this.data.address;
        const goods=[];
        const {cart}=this.data;
            cart.forEach(v=>goods.push({
            goods_id:v.goods_id,
            goods_number:v.num,
            goods_price:v.goods_price
          }));
        const orderParams={order_price,consignee_addr,goods}
        const header={Authorization:this.token}
        const order_num=await request({url:"my/orders/create",mothod:"POST",data:orderParams,header:header});
        console.log(order_num)
      }
      
  },

})
