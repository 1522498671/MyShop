// pages/goods_cart/index.js
import {getSetting,chooseAddress,openSetting,showModal} from "../../utils/asyncWx.js"
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
  onShow(){  
    //获取本地缓存地址
    let address=wx.getStorageSync("address")||[];
    address.all=address.provinceName+address.countyName+address.detailInfo
      // 获取本地购物车缓存数据
      const cart=wx.getStorageSync("cart")||[];
      // let checkedall=carts.length?carts.every(v=>v.checked):false;
      this.setData({
        address
      })
      this.setCart(cart);
  },
  // handleAddress(){
  //   wx.getSetting({
  //     success:(res)=>{
  //      const chooseAddress=res.authSetting["scope.address"];
  //      if(chooseAddress==true||chooseAddress==undefined)
  //      {
  //        wx.chooseAddress({
  //          success: (result1) => {
  //            console.log(result1)
  //          },
  //        });
  //      }else{   
  //        wx.openSetting({
  //          success: (result2) => {
  //           //  wx.chooseAddress({
  //           //    success: (result3) => {
  //           //      console.log(result3)
  //           //    },
  //           //  })
  //          },
  //        })
  //      }
  //     },

  //   });   
  // },
  //点击地址
  async handleAddress(){ 
    //获取权限状态
    try {
    const getadd=await getSetting();
    const scopeAddress=getadd.authSetting["scope.address"];
    //判断权限状态
    if(scopeAddress==false){
     //诱导用户打开授权界面
      const res2=await openSetting();
    }    
    //调用获取地址的api
    const address=await chooseAddress();
    wx.setStorageSync("address", address);
  }
  catch(err){
    console.log(err) 
  }  
  },
  //单选功能
  handleItemChange(e){
    const {goods_id}=e.currentTarget.dataset
    const {cart}=this.data;
    console.log(goods_id)
    const index=cart.findIndex(v=>v.goods_id===goods_id);
    //状态进行取反。
    cart[index].checked=!cart[index].checked;
    //之后进行购物车计算
    this.setCart(cart);  

  },
  //计算购物车分装方法
  setCart(carts){
    let totalPrice=0;  
    let totalNum=0;  
    let checkedall=true
    carts.forEach(v=>{
      if(v.checked){
        totalPrice+=v.num*v.goods_price;
        totalNum+=v.num;
      }else{
         checkedall=false;
      }
    });
    checkedall=carts.length!=0?checkedall:false
    this.setData({
      totalNum,
      totalPrice,   
      // address:address,
      cart:carts, 
      checkedall
    })
    wx.setStorageSync("cart",carts);
  },
  //全选功能
  handleItemAllChange(e){
    let {cart,checkedall}=this.data;
    checkedall=!checkedall;
    cart.forEach(v=>{
      v.checked=checkedall;
    })
    this.setCart(cart);  
  },
  async hanleItemNumEdit(e){
    const {goods_id,operation}=e.currentTarget.dataset
    let {cart}=this.data;
    const index=cart.findIndex(v=>v.goods_id==goods_id)
      cart[index].num+=operation;
      if(cart[index].num<=1&&operation===-1){
        const result=await showModal({content:'您是否要删除'});
        if(result.confirm){
          cart.splice(index,1);
          this.setCart(cart);  
        }
      }
      if(cart[index].num<=0){
        cart[index].num=0;
      }  
    this.setCart(cart);
  },
  handlePriceBtn(e){
    const {totalPrice}=this.data
    const {address}=this.data
      if(address.length==0){
        wx.showToast({
          title: '请选择收货地址',
          icon: 'succes',
          duration: 1000,
          mask: true,
          success: (result)=>{
          },
          fail: ()=>{},
          complete: ()=>{}  
        });  
      }else if(totalPrice==0){
        wx.showToast({
          title: '您还没选购商品',
          icon: 'succes',  
          duration: 1500,
          mask: true,
          success: (result)=>{
          },
          fail: ()=>{},
          complete: ()=>{}
        });
        return;
      }
      else{
        wx.navigateTo({
          url: '/pages/goods_pay/index',
          success: (result)=>{
            
          },
          fail: ()=>{},
          complete: ()=>{}
        });
      }
    
  }

})
